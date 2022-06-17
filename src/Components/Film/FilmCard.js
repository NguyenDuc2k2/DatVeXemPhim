import React from 'react';
import { NavLink } from 'react-router-dom';
import './FilmCard.css';

export default function FilmCard(props) {

    const { item } = props;

    return (
        <div className="flip-card" >
            <div className="flip-card-inner" style={{ height: 400 }}>
                <div className="flip-card-front" style={{ backgroundImage: `url(${item.hinhAnh})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
                <div className="flip-card-back ">
                    <div className="flip-card-front " style={{ backgroundImage: `url(${item.hinhAnh})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className='w-full h-full' style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <i className="fa-solid fa-circle-play" style={{ color: 'white', fontSize: 50, marginTop: '9rem'}}></i>
                            <p className='text-white block mt-2 text-2xl'>{item.tenPhim}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full bg-purple-400 flex items-center justify-center p-2 mt-4'>
                <NavLink to={`/detail/${item.maPhim}`} className='text-white font-bold text-base'>Đặt Vé</NavLink>
            </div>
            <div>
            </div>
        </div>

    )
}
