import { combineReducers } from 'redux'
import listCourseReducer from './../../containers/LecturesTemplate/ListCourse/modules/reducer'
import detailCourseReducer from '../../containers/LecturesTemplate/DetailListCourse/modules/reducer'

const rootReducer = combineReducers({
    listCourseReducer,
    detailCourseReducer
})

export default rootReducer