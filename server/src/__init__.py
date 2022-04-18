from flask import Flask, render_template, url_for, flash, redirect
import os
from src.database import db
from src.courses import courses
from src.lectures import lectures
from src.students import students
from src.studentImages import studentImages
from src.classrooms import classrooms
from src.classroomDetails import classroomDetails
from flask_jwt_extended import JWTManager
from src.constants.http_status_code import HTTP_500_INTERNAL_SERVER_ERROR, HTTP_404_NOT_FOUND
from flask.json import jsonify

def create_app(test_config= None):
    app= Flask(__name__, instance_relative_config= True ,template_folder='./template', static_folder='./static')

    if test_config is None:
        app.config.from_mapping(
            SECRET_KEY=os.environ.get("dev"),
            SQLALCHEMY_DATABASE_URI="sqlite:///studywithme.db", 
            SQLALCHEMY_TRACK_MODIFICATIONS = False,
            JWT_SECRET_KEY="JWT_SECRET_KEY"
        )
    else:
        app.config.from_mapping(test_config)

    db.app = app
    db.init_app(app)

    JWTManager(app)

    with app.app_context():
        db.create_all()


    app.register_blueprint(courses)
    app.register_blueprint(lectures)
    app.register_blueprint(students)
    app.register_blueprint(studentImages)
    app.register_blueprint(classrooms)
    app.register_blueprint(classroomDetails)

    @app.errorhandler(HTTP_404_NOT_FOUND)
    def handle_404(e):
        return jsonify({'error': 'Not found'}), HTTP_404_NOT_FOUND

    @app.errorhandler(HTTP_500_INTERNAL_SERVER_ERROR)
    def handle_500(e):
        return jsonify({'error': 'Something went wrong, we are working on it'}), HTTP_500_INTERNAL_SERVER_ERROR

    @app.route("/")
    def index():
        return render_template('index.html')    
    
    return app