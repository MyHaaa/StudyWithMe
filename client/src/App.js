import PageNotFound from './containers/PageNotFound';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { renderRoutes } from './routes';
import Navbar  from './containers/LecturesTemplate/_component/Navbar';
import Sidebar from './containers/LecturesTemplate/_component/Sidebar';



function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className='container-fluid'>
        <div className='row'>
          <Sidebar/>
          <main role="main" class='col-md-9 ml-sm-auto col-lg-10 px-4'>
            <div class='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
              <Routes>
              {renderRoutes()}
              <Route path='*' element={<PageNotFound />} />
              </Routes>
            </div>
          </main>     
        </div>
      </div>           
    </BrowserRouter>
  );
}

export default App;
