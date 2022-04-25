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
        // route.get("/", (req, res) => {
        //     res.setHeader("Access-Control-Allow-Origin", "*")
        //     res.setHeader("Access-Control-Allow-Credentials", "true");
        //     res.setHeader("Access-Control-Max-Age", "1800");
        //     res.setHeader("Access-Control-Allow-Headers", "content-type");
        //     res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        //      });
        return (           
            <Route key={index} path={route.path} element={<route.element />} />
        );
    });
}

export {renderRoutes}