from operator import imod
from flask import Blueprint, request,Response
from flask.json import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from src.constants.http_status_code import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT
from datetime import date, datetime
from src.database import Student, db, StudentImage
import distutils
import json
import jsonpickle
from json import JSONEncoder

students = Blueprint("students", __name__, url_prefix="/api/v1/students")

class DatetimeEncoder(json.JSONEncoder):
    def default(self, obj):
        try:
            return super().default(obj)
        except TypeError:
            return str(obj)

def to_bool(value):
    """
       Converts 'something' to boolean. Raises exception for invalid formats
           Possible True  values: 1, True, "1", "TRue", "yes", "y", "t"
           Possible False values: 0, False, None, [], {}, "", "0", "faLse", "no", "n", "f", 0.0, ...
    """
    if str(value).lower() in ("yes", "y", "true",  "t", "1"): return True
    if str(value).lower() in ("no",  "n", "false", "f", "0", "0.0", "", "none", "[]", "{}"): return False
    raise Exception('Invalid value for boolean conversion: ' + str(value))

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
        
        genderValue = to_bool(gender)
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
def get_student(id):
    # current_user = get_jwt_identity()

    student = Student.query.filter_by(studentID=id).first()

    if not student:
        return jsonify({'message': 'Item not found'}), HTTP_404_NOT_FOUND

    images_query = db.session.query(
        StudentImage
    ).filter(StudentImage.student_ID == student.studentID).all()
    data = []
    for student_img in images_query:
        data.append({
            'imgID': student_img.imgID,
            'img': student_img.img,
            'name': student_img.name,
            'vector': student_img.vector,
            'mimetype': student_img.mimetype,
        })

    student.dateOfBirth = json.dumps(student.dateOfBirth, cls=DatetimeEncoder)

    return  jsonify({
        'images': data,
        'studentID': student.studentID,
        'studentName': student.studentName,
        'dateOfBirth': student.dateOfBirth
    }), HTTP_200_OK

@students.put('/<int:id>')
@students.patch('/<int:id>')
def edit_student(id):
    # current_user = get_jwt_identity()

    student = Student.query.filter_by(courseID=id).first()

    if not student:
        return jsonify({'message': 'Item not found'}), HTTP_404_NOT_FOUND

    studentName = request.get_json().get('studentName', '')
    gender= request.get_json().get('gender', '')
    dateOfBirth= request.get_json().get('dateOfBirth', '')

    student.courseName = studentName
    student.content = bool(gender)
    student.courseStart = datetime.strptime(dateOfBirth, '%d/%m/%Y').date()

    db.session.commit()

    return jsonify({
        'studentID': student.studentID,
        'studentName': student.studentName,
        'gender': student.gender,
        'dateOfBirth': student.dateOfBirth
    }), HTTP_200_OK

@students.delete("/<int:id>")
def delete_student(id):
    student = Student.query.filter(Student.studentID==id).first()

    if not student:
        return jsonify({'message': 'Item not found'}), HTTP_404_NOT_FOUND

    db.session.delete(student)
    db.session.commit()

    return jsonify({}), HTTP_204_NO_CONTENT