import React, { Component } from 'react'
import Loader from '../../../components/Loader';
import {connect} from 'react-redux'
import { actionFetchDetailCourse } from './modules/action';
import { useParams } from 'react-router-dom';

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

    render() {
    return (
      <div>index</div>
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