import * as ActionType from './constants'
import axios from 'axios'

export const actionFetchListCourse = ()=>{
    // call api in here
    return (dispatch)=>{
        dispatch(actListCourseRequest())
        axios({
            url: "/courses/",
            method: "GET"
        })
            .then((result)=>{
            // success
            // this.setState({
            //   loading: false,
            //   data: result.data.data,
            //   error: null
            // })
            dispatch(actListCourseSuccess(result.data.data))
            })
            .catch((error)=>{
            // error
            // bị lỗi thì chạy vô hàm catch, mình handle 1 cái callback function 
            // this.setState({
            //   loading: false,
            //   data: null,
            //   error
            // })
            dispatch(actListCourseError(error))      
            })
    }
}

export const actListCourseRequest = () =>{
    return{
        type: ActionType.LIST_COURSE_REQUEST
    }
}

export const actListCourseSuccess = (data) =>{
    return{
        type: ActionType.LIST_COURSE_SUCCESS,
        payLoad: data
    }
}

export const actListCourseError = (error)=>{
    return{
        type: ActionType.LIST_COURSE_ERROR,
        payLoad: error
    }
}