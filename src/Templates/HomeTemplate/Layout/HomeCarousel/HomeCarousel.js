/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getCarouselAction } from '../../../../Redux/Action/CarouselAction';

export default function HomeCarousel(props) {

    const dispatch = useDispatch();

    const arrImg = useSelector(state => state.CarouselReducer.arrImg);

    useEffect(() => {
        dispatch(getCarouselAction)
    }, [])

    const contentStyle = {
        height: '600px',
        color: '#fff',
        width: "100%",
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        backgroundSize: "100% 100%",
        backgroundPosition: 'center%',
        backgroundRepeat: 'no-repeat'
    };

    const renderImage = () => {
        return arrImg.map((items, index) => {
            return (
                <div key={index}>
                    <div style={{ ...contentStyle, backgroundImage: `url(${items.hinhAnh})` }}>
                        <img src={items.hinhAnh} alt='' className=' opacity-0' />
                    </div>
                </div>
            )
        })
    }
    return (
        <Carousel effect="fade" className=''>
            {renderImage()}
        </Carousel>
    )
}
