import React from 'react'

export default function PageNotFound(props) {
  return (
    <div className='d-flex justify-content-center align-items-center ' style={{ height: window.innerHeight }}>
    <h3 className='text-danger text-center'> Không tím thấy {props.location.pathname} </h3>
</div>
  )
}

