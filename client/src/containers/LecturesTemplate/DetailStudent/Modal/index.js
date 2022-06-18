import React from 'react'
import WebcamComponent from '../WebcamComponent'
import '../../../Assets/modal.css'

export default function Modal({handler}) {
  return (
    <div className="modal" >
      <WebcamComponent/>
      <button type="button" onClick={handler}>Close Modal</button>
    </div>
  )
}
