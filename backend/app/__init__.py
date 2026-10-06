from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv

# .env ফাইলের গোপন তথ্যগুলো লোড করা হচ্ছে
load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, '..', 'instance', 'hotelease.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # মডার্ন সিকিউরিটি: .env থেকে সিক্রেট কি নেওয়া হচ্ছে
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_fallback_secret_key')
    
    db.init_app(app)
    
    with app.app_context():
        from . import models
        from . import routes
        app.register_blueprint(routes.main_routes)
        db.create_all()
        
    return app