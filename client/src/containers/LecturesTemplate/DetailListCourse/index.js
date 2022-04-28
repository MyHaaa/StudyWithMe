import React, { Component } from 'react'
import Loader from '../../../components/Loader';
import {connect} from 'react-redux'
import { actionFetchDetailCourse } from './modules/action';
import { useParams } from 'react-router-dom';
import '../../Assets/detail-course.css'

export function withRouter(Children){
  return(props)=>{

     const match  = {params: useParams()};
     return <Children {...props}  match = {match}/>
 }
}

class DetailCourse extends Component {
  
  componentDidMount(){
    const { courseID } = this.props.match.params
    this.props.fetchData(courseID)
    console.log(courseID)
  }

  renderDetailCourse=()=>{
    
  }

  render() {
    const { data, loading } = this.props;
    if (loading) return <Loader />;
    return (
      <div className="container" style={{backgroundColor: "white"}}>
      <h3>Detail of Cousre</h3>
      <div className="row">
        <div className="col-md-6">
          
        </div>
        <div className="col-md-6">
          <table className="table">
            <tbody>
              <tr>
                <td className='table-row-content'>Cousre Name</td>
                <td>{data?.courseName}</td>
              </tr>
              <tr>
                <td className='table-row-content'>Description</td>
                <td>{data?.content}</td>
              </tr>
              <tr>
                <td className='table-row-content'>Cousre Started Day</td>
                <td>{data?.courseStart}</td>
              </tr>
              <tr>
                <td className='table-row-content'>Course Ended Day</td>
                <td>{data?.courseEnd}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <td className='table-row-content'>ClassroomID</td>
                <td className='table-row-content'>Room No</td>
                <td className='table-row-content'>Class Day</td>
                <td className='table-row-content'>Time Start</td>
                <td className='table-row-content'>Time End</td>
              </tr>
            </thead>
            {/* <tbody>{this.renderTable()}</tbody> */}
          </table>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
    loading: state.detailCourseReducer.loading,
    data: state.detailCourseReducer.data
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    fetchData: (courseID)=>{
      dispatch(actionFetchDetailCourse(courseID))
    }
  }
}

// export default (DetailCourse);



export default connect(mapStateToProps, mapDispatchToProps) ( withRouter(DetailCourse));