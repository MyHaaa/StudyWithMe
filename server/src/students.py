from flask import Blueprint, request
from flask.json import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from src.constants.http_status_code import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT
from datetime import date, datetime
from src.database import Student, db
import distutils

students = Blueprint("students", __name__, url_prefix="/api/v1/students")

@students.route('/', methods=['POST', 'GET'])
def handle_courses():

    if request.method == 'POST':
        studentName = request.get_json().get('studentName', '')
        gender= request.get_json().get('gender', '')
        dateOfBirth= request.get_json().get('dateOfBirth', '')

        if Student.query.filter_by(studentName=studentName).first():
            return jsonify({
                'Error': 'Student name already exist'
            }), HTTP_409_CONFLICT
        
        genderValue = distutils.util.strtobool(gender)
        birth = datetime.strptime(dateOfBirth, '%d/%m/%Y').date()

        student= Student(studentName= studentName, gender=genderValue, dateOfBirth=birth)

        db.session.add(student)
        db.session.commit()

        return jsonify({
            'studentID': student.studentID,
            'studentName': student.studentName,
            'gender': student.gender,
            'dateOfBirth': student.dateOfBirth
        }), HTTP_201_CREATED

    else:
        students = Student.query.all()
        
        data = []

        for student in students:
            data.append({
                'studentID': student.studentID,
                'studentName': student.studentName,
                'gender': student.gender,
                'dateOfBirth': student.dateOfBirth
            })

        return jsonify({'data': data}), HTTP_200_OK

@students.get("/<int:id>")
def get_course(id):
    # current_user = get_jwt_identity()

    student = Student.query.filter_by(studentID=id).first()

    if not student:
        return jsonify({'message': 'Item not found'}), HTTP_404_NOT_FOUND

    return jsonify({
        'studentID': student.studentID,
        'studentName': student.studentName,
        'gender': student.gender,
        'dateOfBirth': student.dateOfBirth
    }), HTTP_200_OK

@students.put('/<int:id>')
@students.patch('/<int:id>')
def editCourse(id):
    # current_user = get_jwt_identity()

    student = Student.query.filter_by(courseID=id).first()

    if not student:
        return jsonify({'message': 'Item not found'}), HTTP_404_NOT_FOUND

    studentName = request.get_json().get('studentName', '')
    gender= request.get_json().get('gender', '')
    dateOfBirth= request.get_json().get('dateOfBirth', '')

    student.courseName = studentName
    student.content = distutils.util.strtobool(gender)
    student.courseStart = datetime.strptime(dateOfBirth, '%d/%m/%Y').date()

    db.session.commit()

    return jsonify({
        'studentID': student.studentID,
        'studentName': student.studentName,
        'gender': student.gender,
        'dateOfBirth': student.dateOfBirth
    }), HTTP_200_OK

@students.delete("/<int:id>")
def delete_course(id):
    student = Student.query.filter_by(id=id).first()

    if not student:
        return jsonify({'message': 'Item not found'}), HTTP_404_NOT_FOUND

    db.session.delete(student)
    db.session.commit()

    return jsonify({}), HTTP_204_NO_CONTENT