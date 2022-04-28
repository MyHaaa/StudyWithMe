import json
from flask import Blueprint, request
from flask.json import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from requests import Session
from src.constants.http_status_code import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT
from datetime import date, datetime
from src.database import Course, db, Classroom

courses = Blueprint("courses", __name__, url_prefix="/api/v1/courses")

class DatetimeEncoder(json.JSONEncoder):
    def default(self, obj):
        try:
            return super().default(obj)
        except TypeError:
            return str(obj)

"""This was a standard way to do define a route in a previous versons of flask, if we want to define an endpoint (end point and route are the same thing ) that accepts both a get and a post method """
@courses.route('/', methods=['POST', 'GET'])
# @jwt_required()
def handle_courses():
    # current_user = get_jwt_identity()

    if request.method == 'POST':
        courseName = request.get_json().get('courseName', '')
        content = request.get_json().get('content', '')
        courseStart= request.get_json().get('courseStart', '')
        courseEnd= request.get_json().get('courseEnd', '')

        if Course.query.filter_by(courseName=courseName).first():
            return jsonify({
                'Error': 'Course name already exist'
            }), HTTP_409_CONFLICT
        dayStart = datetime.strptime(courseStart, '%d/%m/%Y').date()
        dayEnd = datetime.strptime(courseEnd, '%d/%m/%Y').date()
        course= Course(courseName= courseName, content= content, courseStart= dayStart, courseEnd = dayEnd)
        db.session.add(course)
        db.session.commit()

        return jsonify({
            'courseID': course.courseID,
            'courseName': course.courseName,
            'content': course.content,           
            'courseStart': course.courseStart,
            'courseEnd': course.courseEnd
        }), HTTP_201_CREATED

    else:
        courses = Course.query.all()
        
        data = []

        for course in courses:
            data.append({
            'courseID': course.courseID,
            'courseName': course.courseName,
            'content': course.content,
            'courseStart': course.courseStart,
            'courseEnd': course.courseEnd
            })

        return jsonify({'data': data}), HTTP_200_OK

@courses.get("/<int:id>")
def get_course(id):
    # current_user = get_jwt_identity()

    course = Course.query.filter_by(courseID=id).first()

    if not course:
        return jsonify({'message': 'Item not found'}), HTTP_404_NOT_FOUND

    classrooms = db.session.query(
        Classroom
    ).filter(Classroom.course_ID == course.courseID).all()

    data = []

    for room in classrooms:
        room.timeStart = json.dumps(room.timeStart, cls=DatetimeEncoder)
        room.timeEnd = json.dumps(room.timeEnd, cls=DatetimeEncoder)
        data.append({            
            'classroomID': room.classroomID,
            'roomNo': room.roomNo,
            'classDay': room.classDay,
            'timeStart': room.timeStart,
            'timeEnd': room.timeEnd,
            'course_ID': room.course_ID,
            'lecture_ID': room.lecture_ID,
        })
    

    return jsonify({
        'courseID': course.courseID,
        'courseName': course.courseName,
        'content': course.content,
        'courseStart': course.courseStart,
        'courseEnd': course.courseEnd,
        'classroom': data
    }), HTTP_200_OK

# When editing, we use PUT or PATCH
@courses.put('/<int:id>')
@courses.patch('/<int:id>')
def editCourse(id):
    # current_user = get_jwt_identity()

    course = Course.query.filter_by(courseID=id).first()

    if not course:
        return jsonify({'message': 'Item not found'}), HTTP_404_NOT_FOUND

    courseName = request.get_json().get('courseName', '')
    content = request.get_json().get('content', '')
    courseStart= request.get_json().get('courseStart', '')
    courseEnd= request.get_json().get('courseEnd', '')

    course.courseName = courseName
    course.content = content
    course.courseStart = datetime.strptime(courseStart, '%d/%m/%Y').date()
    course.courseEnd = datetime.strptime(courseEnd, '%d/%m/%Y').date()

    db.session.commit()

    return jsonify({
        'courseID': course.courseID,
        'courseName': course.courseName,
        'content': course.content,
        'courseStart': course.courseStart,
        'courseEnd': course.courseEnd
    }), HTTP_200_OK

@courses.delete("/<int:id>")
def delete_course(id):
    course = Course.query.filter_by(id=id).first()

    if not course:
        return jsonify({'message': 'Item not found'}), HTTP_404_NOT_FOUND

    db.session.delete(course)
    db.session.commit()

    return jsonify({}), HTTP_204_NO_CONTENT