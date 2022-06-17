import React from 'react';
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
const { TabPane } = Tabs;


export default function HomeMenu(props) {

    const { heThongRap } = props;


    const renderHeThongRap = () => {
        return heThongRap?.map((heThongRap, index) => {
            return (
                <TabPane tab={<img src={heThongRap.logo} className='rounded-full w-12 h-12' alt='' />} key={index}>
                    <Tabs tabPosition='left'>
                        {heThongRap.lstCumRap?.map((cumRap, index) => {
                            return (
                                <TabPane key={index} tab={
                                    <div>
                                        <div style={{ width: 300 }} className='flex'>
                                            <img src='https://th.bing.com/th/id/OIP.lTNTtF6WkgP7l9Rzb3VuUwHaFZ?w=212&h=180&c=7&r=0&o=5&dpr=1.25&pid=1.7' className='w-12 h-12' alt='' />
                                            <div className='text-left ml-3 '>
                                                <p className='mb-1'>{cumRap.tenCumRap}</p>
                                                <p>Chi Tiết</p></div>
                                        </div>
                                        <hr className='w-full bg-black' style={{height:'1px'}} />
                                    </div>}>
                                    {cumRap.danhSachPhim?.slice(0, 5).map((film, index) => {
                                        return (
                                            <div key={index}>
                                                <div className='flex'>
                                                    <div className='mt-5 flex' >
                                                        <img src={film.hinhAnh} alt={film.hinhAnh} className='w-16 h-16' onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'http://picsum.photos/75/75'
                                                        }} />
                                                        <div>
                                                            <p className='ml-3 text-lg font-bold mb-0'>{film.tenPhim} </p>
                                                            <div className='grid grid-cols-6 gap-3 ml-3 mt-2'>
                                                                {film.lstLichChieuTheoPhim?.slice(0, 10).map((lichChieu, index) => {
                                                                    return (
                                                                        <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className='col-span-1 text-white bg-yellow-400 p-1 border-black'>
                                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                                        </NavLink>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr style={{ height: '2px', width: '100%', marginTop: '5px' }} />
                                            </div>
                                        )
                                    })}
                                </TabPane>
                            )
                        })}
                    </Tabs>
                </TabPane>
            )
        })
    }

    return (
        <div className='mt-3'>
            <h3 className='text-2xl'>Hệ Thống Rạp Và Lịch Chiếu Phim</h3>
            <hr className='my-3 bg-black' style={{height:2}} />
            <Tabs tabPosition='left'>
                {renderHeThongRap()}
            </Tabs>
        </div>
    )
}
