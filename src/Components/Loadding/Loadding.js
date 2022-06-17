import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

export default function Loadding() {

    const { isLoadding } = useSelector(state => state.LoaddingReducer);

    return (
        <Fragment>
            {isLoadding ? <div className='flex items-center justify-center' style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,1)', zIndex: '80' }}>
                <div className='text-4xl text-white'>Loadding...</div>
            </div> : ''}
        </Fragment>
    )
}
