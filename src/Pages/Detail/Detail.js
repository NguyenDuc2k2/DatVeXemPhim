/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import { Rate, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../Assets/Styles/circle.css';
import { layThongTinLichChieuPhim } from '../../Redux/Action/QuanLyRapAction';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { StarOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

export default function Detail(props) {

    const dispatch = useDispatch();

    const { filmDetil } = useSelector(state => state.QuanLyPhimReducer);

    useEffect(() => {
        let { id } = props.match.params;
        dispatch(layThongTinLichChieuPhim(id));
    }, []);

    return (
        <div className='relative pt-5' >
            <div className='absolute h-full w-full blur-md' style={{ zIndex: -1, backgroundImage: `url(${filmDetil.hinhAnh})`, minHeight: 'auto', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}></div>
            <div className='absolute w-full h-full' style={{ zIndex: -1, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
            <div className='grid grid-cols-12 items-center' style={{ minHeight: '80vh' }}>
                <div className='col-span-6 col-start-3 flex'>
                    <img src={filmDetil.hinhAnh} alt='' style={{ width: 260 }} className='col-span-2' />
                    <div className='col-span-2 ml-10' style={{ marginTop: '10%' }}>
                        <p className='text-white text-lg'>Ngày Khởi Chiếu : {moment(filmDetil.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                        <p className='text-white text-2xl'>{filmDetil.tenPhim}</p>
                        <p className='text-white text-md'>{filmDetil.moTa}</p>
                    </div>
                </div>
                <div className='col-span-2 ml-5 tex-center'>
                    <h1 className='text-green-400' style={{ marginLeft: '14%' }}>Đánh Giá</h1>
                    <h1 style={{ marginLeft: '5%' }} className='text-yellow-400 text-2xl'> <Rate allowHalf value={filmDetil.danhGia / 2} /></h1>
                    <div className={`c100 p${filmDetil.danhGia * 20}`}>
                        <span className='items-center justify-center' style={{ display: 'flex' }}><span>{filmDetil.danhGia}  </span><StarOutlined className='start' /></span>
                        <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <Tabs tabPosition={'top'} className='bg-white p-1' style={{ minHeight: '350px' }} >
                    <TabPane tab={<p className='text-black ml-3 mt-3'>Lịch Chiếu</p>} key="1">
                        <Tabs tabPosition='left'>
                            {filmDetil.heThongRapChieu?.map((htr, index) => {
                                return <TabPane key={index} tab={<div className='text-black'><img src={htr.logo} alt='' className='w-10 h-10 rounded-full inline-block' />{htr.tenHeThongRap}</div>}>
                                    {htr.cumRapChieu?.map((cumRap, index) => {
                                        return (
                                            <div className='mt-2' key={index} >
                                                <div className='flex mb-2'>
                                                    <img src={cumRap.hinhAnh} alt='' style={{ width: 55, height: 55, marginTop: 5 }} />
                                                    <div className='ml-2'>
                                                        <p className='font-bold text-base'>{cumRap.tenCumRap}</p>
                                                        <p className='mb-0'>{cumRap.diaChi}</p>
                                                    </div>
                                                </div>
                                                <div className='gird grid-cols-4 gap-3'>
                                                    {cumRap.lichChieuPhim?.map((lichChieu, index) => {
                                                        return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className='col-span-1 text-white bg-yellow-400 p-1 mr-1 border-black'>
                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                        </NavLink>
                                                    })}
                                                </div>
                                                <hr className='mt-2' />
                                            </div>
                                        )
                                    })}
                                </TabPane>
                            })}
                        </Tabs>
                    </TabPane >
                    <TabPane tab={<p className='text-black mt-3'>Đánh Giá</p>} key="2" >
                        <p className='ml-2'> Hiện chưa có lời đánh giá nào</p>
                    </TabPane>
                    <TabPane tab={<p className='text-black mt-3'>Thông Tin</p>} key="3">
                        <p className='ml-2'>
                            Ngày Khởi Chiếu : {moment(filmDetil.ngayKhoiChieu).format('DD.MM.YYYY hh:mm')}
                        </p>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}
