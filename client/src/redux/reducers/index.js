import { combineReducers } from 'redux'
import listCourseReducer from './../../containers/LecturesTemplate/ListCourse/modules/reducer'
import detailCourseReducer from '../../containers/LecturesTemplate/DetailListCourse/modules/reducer'
import detailClassroomReducer from '../../containers/LecturesTemplate/DetailClassroom/modules/reducer'
import detailStudentReducer from '../../containers/LecturesTemplate/DetailStudent/modules/reducer'
import postImgStudentReducer from '../../containers/LecturesTemplate/DetailStudent/WebcamComponent/modules/reducer'

const rootReducer = combineReducers({
    listCourseReducer,
    detailCourseReducer,
    detailClassroomReducer,
    detailStudentReducer,
    postImgStudentReducer
})

export default rootReducer