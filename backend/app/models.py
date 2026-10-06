from . import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_number = db.Column(db.String(10), unique=True, nullable=False)
    room_type = db.Column(db.String(50), nullable=False)
    price_per_night = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='Available')
    capacity = db.Column(db.Integer, default=2)

    def to_dict(self):
        return {
            'id': self.id,
            'room_number': self.room_number,
            'room_type': self.room_type,
            'price_per_night': self.price_per_night,
            'status': self.status,
            'capacity': self.capacity
        }

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    guest_name = db.Column(db.String(100), nullable=False)
    guest_email = db.Column(db.String(120), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
    check_in = db.Column(db.String(20), nullable=False)
    check_out = db.Column(db.String(20), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='Confirmed')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    room = db.relationship('Room', backref=db.backref('bookings', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'guest_name': self.guest_name,
            'guest_email': self.guest_email,
            'room_number': self.room.room_number if self.room else None,
            'check_in': self.check_in,
            'check_out': self.check_out,
            'total_amount': self.total_amount,
            'status': self.status
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), default='guest') # 'guest' অথবা 'admin'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role
        }