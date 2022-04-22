import Dashboard from "../containers/LecturesTemplate/Dashboard"
import ListCourse from "../containers/LecturesTemplate/ListCourse"
import { Route } from "react-router-dom";

const route = [
    {
        path: '/',
        element: Dashboard
    },
    {
        path: '/list-course',
        element: ListCourse
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