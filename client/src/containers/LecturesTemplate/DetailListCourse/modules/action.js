import * as ActionType from './constants'
import axios from 'axios'

export const actionFetchDetailCourse = (courseID)=>{
    // call api in here
    return (dispatch)=>{
        dispatch(actDetailCourseRequest())
        axios.get(`/courses/${courseID}`)
            .then((result)=>{
            // success
            // this.setState({
            //   loading: false,
            //   data: result.data.data,
            //   error: null
            // })
            dispatch(actDetailCourseSuccess(result.data))
            })
            .catch((error)=>{
            // error
            // bị lỗi thì chạy vô hàm catch, mình handle 1 cái callback function 
            // this.setState({
            //   loading: false,
            //   data: null,
            //   error
            // })
            dispatch(actDetailCourseError(error))      
            })
    }
}

const actDetailCourseRequest = () =>{
    return{
        type: ActionType.DETAIL_COURSE_REQUEST
    }
}

const actDetailCourseSuccess = (data) =>{
    return{
        type: ActionType.DETAIL_COURSE_SUCCESS,
        payLoad: data
    }
}

const actDetailCourseError = (error)=>{
    return{
        type: ActionType.DETAIL_COURSE_ERROR,
        payLoad: error
    }
}