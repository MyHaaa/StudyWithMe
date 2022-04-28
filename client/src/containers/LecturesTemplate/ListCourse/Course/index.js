import React, { Component } from 'react'
import '../../../Assets/style.css'
import {Link} from 'react-router-dom'

export default class Course extends Component {
  render() {
    const { course } = this.props;
    return (
        <div className='col-xs-12 col-sm-4'>
            <div className='card'>
                <a className='img-card' href="http://www.fostrap.com/2016/03/bootstrap-3-carousel-fade-effect.html">
                    <img src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg" />
                </a>
                <div className='card-content'>
                    <h4 className='card-title'>
                        <a href="http://www.fostrap.com/2016/03/bootstrap-3-carousel-fade-effect.html">{course.courseName}</a>
                    </h4>
                     <h6 className=''>{course.content}</h6>
                     <p><b>From:</b> {course.courseStart} <br/><b>To:</b> {course.courseEnd}</p>
                </div>
                <div className='card-read-more'>
                    <Link to={`/detail-course/${course.courseID}`} className='btn btn-link btn-block'>Read More</Link>
                </div>
            </div>   
        </div>                 

    )
  }
}
