from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db= SQLAlchemy()

class Course(db.Model):
    courseID= db.Column(db.Integer, primary_key=True)
    courseName= db.Column(db.Text(), unique=False, nullable=False)
    content = db.Column(db.Text(), nullable=True)
    courseStart = db.Column(db.Date, nullable = False)
    courseEnd= db.Column(db.Date, nullable = False)
    classrooms = db.relationship('Classroom', backref='course', lazy=True)

    def __repr__(self):
        return f"Course('{self.courseID}', '{self.courseName}')"

class Lecture(db.Model):
    lectureID= db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.Text(), nullable=False)
    lectureName= db.Column(db.Text(), unique=False, nullable=False)
    classrooms = db.relationship('Classroom', backref='lecture', lazy=True)

    def __repr__(self):
        return f"User('{self.lectureID}', '{self.lectureName}')"

class Student(db.Model):
    studentID= db.Column(db.Integer, primary_key=True)
    studentName= db.Column(db.Text(), unique=False, nullable=False)
    gender=db.Column(db.Boolean(), nullable=False),
    dateOfBirth=db.Column(db.Date, nullable=False)
    classrooms = db.relationship('Classroom', backref='student', lazy=True)
    studentImages = db.relationship('StudentImage', backref='student', lazy=True)

    def __repr__(self):
        return f"Student('{self.studentID}', '{self.studentName}')"

class StudentImage(db.Model):
    imgID = db.Column(db.Integer, primary_key=True)
    image_file = db.Column(db.String(20), nullable = False, default = ' default.jpg')
    vector= db.Column(db.String(20))
    student_ID = db.Column(db.Integer, db.ForeignKey('student.studentID'))

    def __repr__(self):
        return f"StudentImage('{self.imgID}')"

class Classroom(db.Model):
    classroomID= db.Column(db.Integer, primary_key=True)
    roomNo= db.Column(db.Integer, nullable = False)
    classDay = db.Column(db.Date, nullable = False )
    timeStart= db.Column(db.Time, nullable = False)
    timeEnd= db.Column(db.Time, nullable = False)
    course_ID= db.Column(db.Integer, db.ForeignKey('course.courseID'))
    lecture_ID= db.Column(db.Integer, db.ForeignKey('lecture.lectureID'))
    student_ID= db.Column(db.Integer, db.ForeignKey('student.studentID'))
    classroomDetails= db.relationship('ClassroomDetail', backref='classroom', lazy=True)



    def __repr__(self):
         return f"Classroom('{self.classroomID}', '{self.startDate}', '{self.roomNo}', '{self.timeStart}', '{self.timeEnd}')" 
    
class ClassroomDetail(db.Model):
    classroomDetailID= db.Column(db.Integer, primary_key=True)
    classroomID= db.Column(db.Integer, db.ForeignKey('classroom.classroomID'))
    student_ID= db.Column(db.Integer, db.ForeignKey('student.studentID'))
    adsentTime = db.Column(db.DateTime, nullable = False, default = datetime.utcnow)

    def __repr__(self):
        return f"ClassroomDetail('{self.classroomDetailID}')" 