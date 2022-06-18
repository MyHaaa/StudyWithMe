import * as ActionType from './constants'

const initialState ={
    loading: false,
    data: null,
    error: null
}

const postImgStudentReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ActionType.UPLOAD_IMG_REQUEST:
            state.loading = true
            state.data= null
            state.error= null
            return {...state};
        
        case ActionType.UPLOAD_IMG_SUCCESS:
            state.loading = false
            state.data= action.payLoad
            state.error= null
            return {...state};

        case ActionType.UPLOAD_IMG_ERROR:
            state.loading = false
            state.data= null
            state.error= action.payLoad
            return {...state};

        default:
            return {...state};
    }
}

export default postImgStudentReducer;