import * as ActionType from './constants'

const initialState ={
    loading: false,
    data: null,
    error: null
}

const detailStudentReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ActionType.DETAIL_STUDENT_REQUEST:
            state.loading = true
            state.data= null
            state.error= null
            return {...state};
        
        case ActionType.DETAIL_STUDENT_SUCCESS:
            state.loading = false
            state.data= action.payLoad
            state.error= null
            return {...state};

        case ActionType.DETAIL_STUDENT_ERROR:
            state.loading = false
            state.data= null
            state.error= action.payLoad
            return {...state};

        default:
            return {...state};
    }
}

export default detailStudentReducer;