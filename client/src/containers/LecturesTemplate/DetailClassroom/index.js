import React, { Component } from 'react'
import {connect} from 'react-redux'
import { actionFetchDetailClassroom } from './modules/action';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'
import Loader from '../../../components/Loader';

export function withRouter(Children){
  return(props)=>{

     const match  = {params: useParams()};
     return <Children {...props}  match = {match}/>
 }
}

class DetailClassroom extends Component {

  componentDidMount(){
    const { classroomID } = this.props.match.params
    this.props.fetchData(classroomID)
    console.log(classroomID)
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
    return data?.student?.map((item) => {
      return (
        <tr key={item.studentID}>
          <td className='table-row-td'>{item.studentID}</td>
          
          <td className='table-row-td'>
            <Link to={`/detail-student/${item.studentID}`}  className="btn btn-success">
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
      <h3>Detail of Classroom</h3>
      <div className="row">
        <div className="col-md-5">
          <img className="img-fluid" src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg" />
        </div>
        <div className="col-md-7">
          <table className="table">
            <tbody>
              <tr >
                <td className='table-row-content' style={{width: "150px"}}>Classroom Code:</td>
                <td>{data?.classroomID}</td>
              </tr>
              <tr>
                <td className='table-row-content'>Day of Class:</td>
                <td> {this.renderSwitch(data?.classDay)}</td>
              </tr>
              <tr>
                <td className='table-row-content'>Started Time:</td>
                <td>{data?.timeStart}</td>
              </tr>
              <tr>
                <td className='table-row-content'>Ended Time:</td>
                <td>{data?.timeEnd}</td>
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
                <td className='table-row-content'>Student ID</td>
                <td className='table-row-content'>Action</td>
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
    loading: state.detailClassroomReducer.loading,
    data: state.detailClassroomReducer.data
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    fetchData: (classroomID)=>{
      dispatch(actionFetchDetailClassroom(classroomID))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) ( withRouter(DetailClassroom));