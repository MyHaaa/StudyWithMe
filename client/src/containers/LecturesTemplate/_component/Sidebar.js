import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import '../../Assets/style.css'


export default class Sidebar extends Component {
  render() {
    return (
      <nav className='col-md-2 d-none d-md-block bg-light sidebar'>
        <div className='sidebar-sticky'>
          <ul className='nav flex-column'>
            <li className='nav-item'>
              <NavLink className='nav-link ' to="/">
                <span data-feather='home' />
                Dashboard <span className='sr-only'>(current)</span>
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to="/list-course">
                <span data-feather='file' />
                List Course
              </NavLink>
            </li>
            
          </ul>
          
        </div>
      </nav>


    )
  }
}
