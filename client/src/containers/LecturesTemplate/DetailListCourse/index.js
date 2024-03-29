import React, { Component } from 'react'
import Loader from '../../../components/Loader';
import {connect} from 'react-redux'
import { actionFetchDetailCourse } from './modules/action';
import { useParams } from 'react-router-dom';
import '../../Assets/detail-course.css'
import {Link} from 'react-router-dom'

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

  renderSwitch(param) {
    switch(param) {
      case 0:
        return 'Monday';
      case 1:
        return 'Tuesday';
      case 2:
        return 'Wednesday';
      case 3:
        return 'Thursday';
      case 4:
        return 'Friday';
      case 5:
        return 'Saturday';
      case 6:
        return 'Sunday';
      default:
        return 'Has no specificed day';
    }
  }

  renderTable = () => {
    const { data } = this.props;
    return data?.classroom?.map((item) => {
      return (
        <tr key={item.classroomID}>
          <td className='table-row-td'>{item.classroomID}</td>
          <td className='table-row-td'>{item.roomNo}</td>
          <td className='table-row-td'>
            {this.renderSwitch(item.classDay)}
          </td>       
          <td className='table-row-td'>{item.timeStart}</td>
          <td className='table-row-td'>{item.timeEnd}</td>
          <td className='table-row-td'>
            <Link to={`/detail-classroom/${item.classroomID}`}  className="btn btn-success">
              Detail
            </Link>
          </td>
        </tr>
      );
    });
  };


  render() {
    const { data, loading } = this.props;
    if (loading) return <Loader />;
    return (
      <div className="container" style={{backgroundColor: "white"}}>
      <h3>Detail of Cousre</h3>
      <div className="row">
        <div className="col-md-5">
          <img className="img-fluid" src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg" />
        </div>
        <div className="col-md-7">
          <table className="table">
            <tbody>
              <tr >
                <td className='table-row-content' style={{width: "150px"}}>Name</td>
                <td>{data?.courseName}</td>
              </tr>
              <tr>
                <td className='table-row-content'>Description</td>
                <td>{data?.content}</td>
              </tr>
              <tr>
                <td className='table-row-content'>Started Day</td>
                <td>{data?.courseStart}</td>
              </tr>
              <tr>
                <td className='table-row-content'>Ended Day</td>
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
            <tbody>{this.renderTable()}</tbody>
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

export default connect(mapStateToProps, mapDispatchToProps) ( withRouter(DetailCourse));