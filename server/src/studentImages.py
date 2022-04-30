from fileinput import filename
from flask.json import jsonify
import mimetypes
from flask import Blueprint, request, Response
from werkzeug.utils import secure_filename
from werkzeug.datastructures import  FileStorage
from src.constants.http_status_code import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT
from src.database import StudentImage, db

studentImages = Blueprint("studentImages", __name__, url_prefix="/api/v1/studentImages")

@studentImages.route("/upload", methods=['POST'])
def upload_img(studentID):
    pic = request.files['pic']

    if not pic:
        return 'No pic uploaded', HTTP_400_BAD_REQUEST
    
    filename = secure_filename(pic.filename)
    mimetype =pic.mimetype

    img = StudentImage(img=pic.read(), name=filename, vetor= "",
    studentID=studentID, mimetype=mimetype)
    db.session.add(img)
    db.session.commit()

    return 'Img Uploaded!', HTTP_201_CREATED

@studentImages.route("/<int:id>")
def get_Image(id):
    images= StudentImage.query.filter_by(student_ID = id)

    data = []

    for student_img in images:
        data.append({
            'imgID': student_img.imgID,
            'img': student_img.img,
            'name': student_img.name,
            'vector': student_img.vector,
            'student_ID': student_img.student_ID,
            'mimetype': student_img.mimetype
        })

    return jsonify({'data': data}), HTTP_200_OK