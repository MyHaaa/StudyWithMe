import { combineReducers } from 'redux'
import listCourseReducer from './../../containers/LecturesTemplate/ListCourse/modules/reducer'
import detailCourseReducer from '../../containers/LecturesTemplate/DetailListCourse/modules/reducer'
import detailClassroomReducer from '../../containers/LecturesTemplate/DetailClassroom/modules/reducer'

const rootReducer = combineReducers({
    listCourseReducer,
    detailCourseReducer,
    detailClassroomReducer
})

export default rootReducer