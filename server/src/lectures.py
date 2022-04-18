from flask import Blueprint, request, jsonify
from src.database import db, Lecture
from src.constants.http_status_code import HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_409_CONFLICT
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import jwt_required, create_access_token, create_refresh_token, get_jwt_identity

lectures = Blueprint("lectures", __name__, url_prefix="/api/v1/lectures")

@lectures.post('/register')
def register():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    lectureName = request.json['lectureName']
    
    pwd_hash = generate_password_hash(password)

    lecture = Lecture(username=username, password=pwd_hash, email=email, lectureName = lectureName)
    db.session.add(lecture)
    db.session.commit()

    return jsonify({
        'message': "Lecture created",
        'lecture': {
            'username': username, "email": email
        }

    }), HTTP_201_CREATED


@lectures.post('/login')
def login():
    email = request.json.get('email', '')
    password = request.json.get('password', '')

    lecture = Lecture.query.filter_by(email=email).first()

    if lecture:
        is_pass_correct = check_password_hash(lecture.password, password)

        if is_pass_correct:
            refresh = create_refresh_token(identity=lecture.lectureID)
            access = create_access_token(identity=lecture.lectureID)

            return jsonify(access_token = access), HTTP_200_OK

    return jsonify({'error': 'Wrong credentials'}), HTTP_401_UNAUTHORIZED


@lectures.get("/me")
@jwt_required()
def me():
    user_id = get_jwt_identity()
    lecture = Lecture.query.filter_by(lectureID=user_id).first()
    return jsonify({
        'username': lecture.username,
        'email': lecture.email
    }), HTTP_200_OK


@lectures.get('/token/refresh')
@jwt_required(refresh=True)
def refresh_users_token():
    identity = get_jwt_identity()
    access = create_access_token(identity=identity)

    return jsonify({
        'access': access
    }), HTTP_200_OK
