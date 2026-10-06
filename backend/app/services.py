from .models import db, Room, Housekeeping, PromoCode

def init_dummy_data():
    # যদি রুমে কোনো ডেটা না থাকে, তবে ডামি রুম তৈরি করবে
    if Room.query.count() == 0:
        rooms = [
            Room(room_number='101', room_type='Premium Suite', price=350.0, status='Available'),
            Room(room_number='102', room_type='Executive City Room', price=250.0, status='Available'),
            Room(room_number='201', room_type='Standard Room', price=90.0, status='Booked')
        ]
        db.session.bulk_save_objects(rooms)

    # ডামি হাউসকিপিং ডেটা
    if Housekeeping.query.count() == 0:
        hk_tasks = [
            Housekeeping(room_no='101', status='Dirty', housekeeper='Unassigned', maintenance='-'),
            Housekeeping(room_no='102', status='Clean', housekeeper='Maria S.', maintenance='-'),
            Housekeeping(room_no='105', status='Maintenance', housekeeper='-', maintenance='AC Issue')
        ]
        db.session.bulk_save_objects(hk_tasks)

    # ডামি প্রোমো কোড ডেটা
    if PromoCode.query.count() == 0:
        promos = [
            PromoCode(name='Summer Getaway 2026', code='SUMMER25', discount='25% OFF', status='Active'),
            PromoCode(name='Welcome Bonus', code='WELCOME50', discount='$50 FLAT', status='Active')
        ]
        db.session.bulk_save_objects(promos)
        
    db.session.commit()