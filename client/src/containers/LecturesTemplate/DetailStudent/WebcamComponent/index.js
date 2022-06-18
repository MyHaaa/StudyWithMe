import React, { useRef, useEffect, useState } from "react";
// import * as tf from "@tensorflow/tfjs";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as facemesh from '@tensorflow-models/face-landmarks-detection';
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";
import Canvas2Image from "../../../Assets/Canvas2Image"

import {connect} from 'react-redux'
import { actionPostImgStudent } from './modules/action';


function WebcamComponent(props) {
  const webcamRef = useRef(null);
  // const canvasRef = useRef(null);
  const photoRef = useRef(null);
  var photo = null;
  var detectNet = null
  const [photoStatus, setPhotoStatus]= useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  
  const runFacemesh = async () => {
    // OLD MODEL
    // const net = await facemesh.load({
    //   inputResolution: { width: 640, height: 480 },
    //   scale: 0.8,
    // });
    // NEW MODEL
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detectNet = detect(net);
    }, 10);
  };

  const takePicture = () => {
    const width = 640
    const height = 480
    
    let video = webcamRef.current.video
 
    photo = photoRef.current
 
    photo.width = width
 
    photo.height = height
 
    let ctx = photo.getContext('2d')
    ctx.drawImage(video, 0, 0, width, height)
    setPhotoStatus(true)
    console.log(ctx)

    var img = new Image;
    img.src = photo.toDataURL();
    Canvas2Image.convertToImage(photo, width, height, "png");
    setImageSrc(img.src)
    console.log(imageSrc)
  }
 
  const clearImage = () => {
    let photo = photoRef.current
 
    let ctx = photo.getContext('2d')
 
    ctx.clearRect(0,0,photo.width,photo.height)

    setPhotoStatus(false)
  }

  const SaveImage =()=>{
    let data = new FormData()
    data.append('img',imageSrc)
    console.log(data)
    props.postData(props.studentID, data)
  }
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      // canvasRef.current.width = videoWidth;
      // canvasRef.current.height = videoHeight;

      // Make Detections
      // OLD MODEL
      //       const face = await net.estimateFaces(video);
      // NEW MODEL
      const face = await net.estimateFaces({input:video});
      console.log(face);

      // Get canvas context
      // const ctx = canvasRef.current.getContext("2d");
      // requestAnimationFrame(()=>{drawMesh(face, ctx)});
    }
  };
  

  useEffect(() => {
    // actions performed when component mounts
    runFacemesh()
    console.log(props.studentID)
    return () => {
      clearInterval(detectNet)
    }
  }, [photoStatus]);
  
  return (
      <>
       <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
          
          
        />

        {/* <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        /> */}

        <button onClick={takePicture} className="btn btn-danger container">Take Picture</button>
        
        <canvas id="mycanvas" className="container" ref={photoRef}></canvas>

        <button onClick={clearImage} className="btn btn-primary container">Clear Image</button>
        <button onClick={SaveImage} className="btn btn-primary container">Save Image</button>
      </>
    );
}

const mapStateToProps = (state)=>{
  return{
    loading: state.postImgStudentReducer.loading,
    data: state.postImgStudentReducer.data
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    postData: (studentID, img)=>{
      dispatch(actionPostImgStudent(studentID, img))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (WebcamComponent);