from app import create_app, db
from app.models import Room, User

app = create_app()

def seed_data():
    with app.app_context():
        db.create_all()
        
        # ডিফল্ট রুম তৈরি করা
        if Room.query.count() == 0:
            room1 = Room(room_number='101', room_type='King Suite', price_per_night=250.0, status='Available')
            room2 = Room(room_number='102', room_type='Double Room', price_per_night=156.0, status='Available')
            room3 = Room(room_number='103', room_type='Premium Suite', price_per_night=300.0, status='Available')
            room4 = Room(room_number='104', room_type='Ocean View', price_per_night=199.0, status='Available')
            db.session.add_all([room1, room2, room3, room4])
            
        # ডিফল্ট ইউজার ও অ্যাডমিন তৈরি করা
        if User.query.count() == 0:
            admin = User(name='Hotel Admin', email='admin@hotelease.com', role='admin')
            admin.set_password('admin123')
            
            guest = User(name='Sk Sujaan Mondal', email='sujaan@example.com', role='guest')
            guest.set_password('sujaan123')
            
            db.session.add_all([admin, guest])
            
        db.session.commit()
        print("Database seeded successfully with Rooms and Users!")

if __name__ == '__main__':
    seed_data()
    app.run(debug=True)