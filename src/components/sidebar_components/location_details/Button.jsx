import React, { useState } from 'react';

export default function Button({ text }) {
	

  const handleClick = (e) => {
		setClickedButton(e.target.innerText)
	} 


  return (
    <button onClick={handleClick}>{text}</button>
  )
}
