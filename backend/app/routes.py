from flask import Blueprint, jsonify, request, current_app
from .models import Room, Booking, User
from . import db
import google.generativeai as genai
import jwt
import datetime
import os
from functools import wraps

main_routes = Blueprint('main', __name__)

gemini_api_key = os.getenv("GEMINI_API_KEY")
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

# ----------------- Security Decorator -----------------
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # ফ্রন্টএন্ডের Interceptor থেকে পাঠানো টোকেন রিসিভ করা
        if 'Authorization' in request.headers:
            parts = request.headers['Authorization'].split()
            if len(parts) == 2 and parts[0] == 'Bearer':
                token = parts[1]
        
        if not token:
            return jsonify({'error': 'Token is missing! Please log in.'}), 401
            
        try:
            # টোকেন ভেরিফাই করে আসল ইউজারকে খুঁজে বের করা
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
        except:
            return jsonify({'error': 'Token is invalid or expired!'}), 401
            
        return f(current_user, *args, **kwargs)
    return decorated

# ----------------- Rooms API -----------------
@main_routes.route('/api/rooms', methods=['GET'])
def get_rooms():
    rooms = Room.query.all()
    return jsonify([room.to_dict() for room in rooms])

# ----------------- Bookings API -----------------
@main_routes.route('/api/bookings', methods=['POST'])
def create_booking():
    data = request.json
    new_booking = Booking(
        guest_name=data.get('guest_name', 'Guest'),
        guest_email=data.get('guest_email', 'guest@example.com'),
        room_id=data.get('room_id', 1),
        check_in=data.get('check_in', '2026-11-12'),
        check_out=data.get('check_out', '2026-11-14'),
        total_amount=data.get('total_amount', 0.0)
    )
    db.session.add(new_booking)
    
    room = Room.query.get(data.get('room_id', 1))
    if room:
        room.status = 'Occupied'
        
    db.session.commit()
    return jsonify({'message': 'Booking confirmed successfully!', 'booking_id': new_booking.id}), 201

# এই API টি এখন সম্পূর্ণ প্রটেক্টেড!
@main_routes.route('/api/bookings', methods=['GET'])
@token_required
def get_bookings(current_user):
    # যদি ইউজার 'guest' হয়, সে শুধু নিজের ইমেইল দিয়ে করা বুকিং দেখতে পাবে
    if current_user.role == 'guest':
        bookings = Booking.query.filter_by(guest_email=current_user.email).all()
    else:
        # 'admin' হলে সে সিস্টেমের সমস্ত বুকিং দেখতে পাবে
        bookings = Booking.query.all()
        
    return jsonify([booking.to_dict() for booking in bookings])

# ----------------- AI Chat API -----------------
@main_routes.route('/api/chat', methods=['POST'])
def chat_with_ai():
    data = request.json
    user_message = data.get('message', '')
    
    try:
        prompt = f"""
        You are 'HotelEase AI Concierge', a highly professional and polite virtual assistant for a luxury hotel named HotelEase. 
        Keep your answers concise, helpful, and friendly. 
        User asks: {user_message}
        """
        response = model.generate_content(prompt)
        return jsonify({'reply': response.text})
    except Exception as e:
        print("AI Error:", e)
        return jsonify({'reply': "I apologize, but my systems are currently updating. Please contact the front desk for immediate assistance."}), 500

# ----------------- Authentication API -----------------
@main_routes.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({'error': 'Email already exists!'}), 400

    new_user = User(
        name=data.get('name'),
        email=data.get('email'),
        role=data.get('role', 'guest')
    )
    new_user.set_password(data.get('password'))
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'Account created successfully!', 'user': new_user.to_dict()}), 201

@main_routes.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user and user.check_password(data.get('password')):
        token = jwt.encode({
            'user_id': user.id,
            'role': user.role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, current_app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({
            'message': 'Login successful', 
            'token': token, 
            'user': user.to_dict()
        }), 200
        
    return jsonify({'error': 'Invalid email or password'}), 401