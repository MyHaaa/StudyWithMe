import * as ActionType from './constants'
import axios from 'axios'

export const actionFetchDetailStudent = (studentID)=>{
    // call api in here
    return (dispatch)=>{
        dispatch(actDetailStudentRequest())
        axios.get(`/students/${studentID}`)
            .then((result)=>{
            // success
            // this.setState({
            //   loading: false,
            //   data: result.data.data,
            //   error: null
            // })
            dispatch(actDetailStudentSuccess(result.data))
            })
            .catch((error)=>{
            // error
            // bị lỗi thì chạy vô hàm catch, mình handle 1 cái callback function 
            // this.setState({
            //   loading: false,
            //   data: null,
            //   error
            // })
            dispatch(actDetailStudentError(error))      
            })
    }
}

export const actDetailStudentRequest = () =>{
    return{
        type: ActionType.DETAIL_STUDENT_REQUEST
    }
}

export const actDetailStudentSuccess = (data) =>{
    return{
        type: ActionType.DETAIL_STUDENT_SUCCESS,
        payLoad: data
    }
}

export const actDetailStudentError = (error)=>{
    return{
        type: ActionType.DETAIL_STUDENT_ERROR,
        payLoad: error
    }
}