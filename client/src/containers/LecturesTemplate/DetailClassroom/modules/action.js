import * as ActionType from './constants'
import axios from 'axios'

export const actionFetchDetailClassroom = (classroomID)=>{
    // call api in here
    return (dispatch)=>{
        dispatch(actDetailClassroomRequest())
        axios.get(`/classrooms/${classroomID}`)
            .then((result)=>{
            // success
            // this.setState({
            //   loading: false,
            //   data: result.data.data,
            //   error: null
            // })
            dispatch(actDetailClassroomSuccess(result.data))
            })
            .catch((error)=>{
            // error
            // bị lỗi thì chạy vô hàm catch, mình handle 1 cái callback function 
            // this.setState({
            //   loading: false,
            //   data: null,
            //   error
            // })
            dispatch(actDetailClassroomError(error))      
            })
    }
}

export const actDetailClassroomRequest = () =>{
    return{
        type: ActionType.DETAIL_CLASSROOM_REQUEST
    }
}

export const actDetailClassroomSuccess = (data) =>{
    return{
        type: ActionType.DETAIL_CLASSROOM_SUCCESS,
        payLoad: data
    }
}

export const actDetailClassroomError = (error)=>{
    return{
        type: ActionType.DETAIL_CLASSROOM_ERROR,
        payLoad: error
    }
}