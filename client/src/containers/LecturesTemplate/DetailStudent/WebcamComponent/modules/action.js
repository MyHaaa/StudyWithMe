import * as ActionType from './constants'
import axios from 'axios'

export const actionPostImgStudent = (studentID, img)=>{
    // call api in here
    return (dispatch)=>{
        dispatch(actUploadImgRequest())
        axios.post(`/studentImages/upload/${studentID}`, img)
            .then((result)=>{
            // success
            // this.setState({
            //   loading: false,
            //   data: result.data.data,
            //   error: null
            // })
                dispatch(actUploadImgSuccess(result.data))
            })
            .catch((error)=>{
            // error
            // bị lỗi thì chạy vô hàm catch, mình handle 1 cái callback function 
            // this.setState({
            //   loading: false,
            //   data: null,
            //   error
            // })
                dispatch(actUploadImgError(error))      
            })
    }
}

export const actUploadImgRequest = () =>{
    return{
        type: ActionType.UPLOAD_IMG_REQUEST
    }
}

export const actUploadImgSuccess = (data) =>{
    return{
        type: ActionType.UPLOAD_IMG_SUCCESS,
        payLoad: data
    }
}

export const actUploadImgError = (error)=>{
    return{
        type: ActionType.UPLOAD_IMG_ERROR,
        payLoad: error
    }
}