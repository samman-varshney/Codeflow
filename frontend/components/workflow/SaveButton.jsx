import React from 'react'
import { FaBoxOpen } from 'react-icons/fa';
function SaveButton() {
  return (
    <button className="download-btn text-[#e40b7f]" onClick={() => {alert('Save button clicked')}}>
      <FaBoxOpen className="mr-2" size={28}/>
    </button>
  )
}

export default SaveButton