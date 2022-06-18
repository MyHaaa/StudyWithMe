import React, { Component, useState, useEffect  } from 'react'
import {connect} from 'react-redux'
import { actionFetchDetailStudent } from './modules/action';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import Modal from './Modal';
import WebcamComponent from './WebcamComponent';

export function withRouter(Children){
  return(props)=>{

     const match  = {params: useParams()};
     return <Children {...props}  match = {match}/>
 }
}


const DetailStudent = (props) => {

  const [activeCam, setActiveCam] = useState(false)

  // const [openModal, setOpenModal] = useState(false)
  // const toggleModal = () => {
  //   setOpenModal(!openModal);
  // }

  useEffect(() => { 
    const { studentID } = props.match.params
    props.fetchData(studentID)
    console.log(props)
  }, []);

  
  const { data, loading } = props;
    
  if (loading) return <Loader />;

  return (
      <div className="container" style={{backgroundColor: "white"}}>
      <h3>Detail of Student</h3>
      <div className="row" style={{ height: "480"}}>
        <div className="col-md-8" >
          <div >
            {activeCam === true && <WebcamComponent studentID={props.match.params.studentID}/>}
          </div>
        </div>
        <div className="col-md-4">
          <table className="table">
            <tbody>
              <tr >
                <td className='table-row-content' style={{width: "150px"}}>Student Code:</td>
                <td>{data?.studentID}</td>
              </tr>
              <tr>
                <td className='table-row-content'>Student Name:</td>
                <td>{data?.studentName}</td>
              </tr>
              <tr>
                <td className='table-row-content'>Gender:</td>
                <td></td>
              </tr>
              <tr>
                <td className='table-row-content'>Date of Birth:</td>
                <td>{data?.dateOfBirth}</td>
              </tr>
              <tr>
                <td> 
                  {!activeCam?
                  <button onClick={()=>setActiveCam(true)} className="btn btn-primary">Open camera</button>
                  : <button onClick={()=>setActiveCam(false)} className="btn btn-primary">Close camera</button>

                  }
                  {/* {!openModal ?
                    <button type="button" onClick={toggleModal}>Open Modal</button>
                    : <Modal handler={toggleModal} />
                  } */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          
        </div>
      </div>
      </div>
    )
  
}

const mapStateToProps = (state)=>{
  return{
    loading: state.detailStudentReducer.loading,
    data: state.detailStudentReducer.data
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    fetchData: (studentID)=>{
      dispatch(actionFetchDetailStudent(studentID))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) ( withRouter(DetailStudent));