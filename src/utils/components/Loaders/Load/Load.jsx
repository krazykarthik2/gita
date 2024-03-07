import React from 'react'
import { FaSpinner } from 'react-icons/fa6'

function Load({value}) {
  return (
    value?
    <>{value}</>:
    <FaSpinner style={{animation:"spin 1.2s linear infinite"}} />
  )
}

export default Load