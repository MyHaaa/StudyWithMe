import Dashboard from "../containers/LecturesTemplate/Dashboard"
import ListCourse from "../containers/LecturesTemplate/ListCourse"
import DetailCourse from "../containers/LecturesTemplate/DetailListCourse";
import DetailClassroom from "../containers/LecturesTemplate/DetailClassroom";
import DetailStudent from "../containers/LecturesTemplate/DetailStudent";
import { Route } from "react-router-dom";

const route = [
    {
        path: '/',
        element: Dashboard
    },
    {
        path: '/list-course',
        element: ListCourse
    },
    {
        path: '/detail-course/:courseID',
        element: DetailCourse
    },
    {
        path: '/detail-classroom/:classroomID',
        element: DetailClassroom
    },
    {
        path: '/detail-student/:studentID',
        element: DetailStudent
    }
];

function renderRoutes(){
    return route.map((route, index)=> {
        return (           
            <Route key={index} path={route.path} element={<route.element />} />
        );
    });
}

export {renderRoutes}