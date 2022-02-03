import React, { useContext } from 'react';
import palletpalContext from '../../../palletpalContext';

export default function Button({ text }) {
  const { state: { }, dispatch } = useContext(palletpalContext)

  const handleClick = (e) => {
    dispatch({
      type: 'setPalletOption',
      data: e.target.innerText.toLowerCase()
    })
	} 

  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}
