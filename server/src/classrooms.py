import json
from flask import Blueprint, request,Response
from flask.json import jsonify
from datetime import date, datetime, time
from src.database import Classroom, db,Student, ClassroomDetail
from src.constants.http_status_code import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT

classrooms = Blueprint("classrooms", __name__, url_prefix="/api/v1/classrooms")

class DatetimeEncoder(json.JSONEncoder):
    def default(self, obj):
        try:
            return super().default(obj)
        except TypeError:
            return str(obj)

@classrooms.route('/', methods=['POST', 'GET'])
def handle_classroom():

    if request.method == 'POST':
        roomNo = request.get_json().get('roomNo', '')
        classDay = request.get_json().get('classDay', '')
        timeStart = request.get_json().get('timeStart', '')
        timeEnd = request.get_json().get('timeEnd', '')
        course_ID = request.get_json().get('course_ID', '')
        lecture_ID = request.get_json().get('lecture_ID', '')
        
        room_No = int(roomNo)
        cDay = int(classDay)
        courseID = int(course_ID)
        lectureID = int(lecture_ID)
        timeS = datetime.strptime(timeStart,"%H:%M:%S").time()
        timeE = datetime.strptime(timeEnd,"%H:%M:%S").time()
        classroom = Classroom(roomNo= room_No, classDay=cDay, timeStart= timeS, timeEnd=timeE,course_ID=courseID, lecture_ID= lectureID )

        db.session.add(classroom)
        db.session.commit()

        classroom.timeStart = json.dumps(classroom.timeStart, cls=DatetimeEncoder)
        classroom.timeEnd = json.dumps(classroom.timeEnd, cls=DatetimeEncoder)

        return jsonify({
            'classroomID': classroom.classroomID,
            'roomNo': classroom.roomNo,
            'classDay': classroom.classDay,
            'timeStart': classroom.timeStart,
            'timeEnd': classroom.timeEnd,
            'course_ID': classroom.course_ID,
            'lecture_ID': classroom.lecture_ID,
        }), HTTP_201_CREATED
    else:
        classrooms = Classroom.query.all()
        
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
        
        return jsonify({'data': data}), HTTP_200_OK

@classrooms.get("/<int:id>")
def get_classroom(id):
    classroom = Classroom.query.filter_by(classroomID=id).first()

    if not classroom:
        return jsonify({'message': 'Item not found'}), HTTP_404_NOT_FOUND
    
    details = ClassroomDetail.query.filter(ClassroomDetail.classroomID==id).all()

    data =[]

    for student in details:
        data.append({
            'studentID': student.student_ID
        })
    classroom.timeStart = json.dumps(classroom.timeStart, cls=DatetimeEncoder) 
    classroom.timeEnd = json.dumps(classroom.timeEnd, cls=DatetimeEncoder)

    return jsonify({
        'classroomID': classroom.classroomID,
        'roomNo': classroom.roomNo,
        'classDay': classroom.classDay,
        'timeStart': classroom.timeStart,
        'timeEnd':  classroom.timeEnd,
        'course_ID': classroom.course_ID,
        'lecture_ID': classroom.lecture_ID,
        'student': data
    }), HTTP_200_OK

@classrooms.post("/add-to-classroom/<int:id>")
def addStudentToClass(id):
    student_ID = request.get_json().get('student_ID', '')
    studentID = int(student_ID)

    classroomDetail= ClassroomDetail(classroomID= id,student_ID= studentID )

    db.session.add(classroomDetail)
    db.session.commit()

    return jsonify({
        'classroomDetailID': classroomDetail.classroomDetailID,
        'studentID': classroomDetail.student_ID,
        'classroomID': classroomDetail.classroomID
    }), HTTP_200_OK

    