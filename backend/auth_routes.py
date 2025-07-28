from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

from werkzeug.security import check_password_hash
from models import User, db

auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/login', methods=['POST'])
@cross_origin(origin="http://localhost:3001", supports_credentials=True)
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()

    if user and check_password_hash(user.password, data['password']):
        return jsonify({"full_name": user.full_name})
    else:
        return jsonify({"message": "Geçersiz giriş"}), 401

@auth_bp.route('/register', methods=['POST'])
@cross_origin(origin="http://localhost:3001", supports_credentials=True)
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Bu e-posta zaten kayıtlı"}), 409

    new_user = User(email=data['email'], full_name=data.get('full_name', ''), password=data['password'])  # Şifreyi hashlemeyi unutma!
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Kayıt başarılı"})
