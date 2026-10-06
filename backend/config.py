import os

class Config:
    # সিক্রেট কি এবং ডাটাবেস ইউআরএল
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'super-secret-key-hotelease'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///hotelease.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False