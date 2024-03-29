import React, { Component } from 'react'
import '../../Assets/style.css'
import { NavLink } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow' >
        <a className='navbar-brand col-sm-3 col-md-2 mr-0' href="#">LECTURE</a>
        <input className='form-control form-control-dark w-100' type="text" placeholder="Search" aria-label="Search" />
        <ul className='navbar-nav px-3'>
          <li className='nav-item text-nowrap'>
            <NavLink className='nav-link' to="#">Sign out</NavLink>
          </li>
        </ul>
      </nav>

    )
  }
}
