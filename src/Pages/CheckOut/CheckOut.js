/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { datGheAction, datVeAction, layChietPhongVe } from '../../Redux/Action/QuanLyDatVeAction';
import { CloseOutlined, UserOutlined, CheckOutlined, SmileOutlined } from '@ant-design/icons'
import style from './CheckOut.module.css';
import './CheckOut.css';
import { CHUYEN_TAB } from '../../Redux/Action/Type/QuanLyDatVeType';
import _ from 'lodash'
import { ThongTinDatVe } from '../../_Core/Models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinNguoiDung } from '../../Redux/Action/QuanLyNguoiDungAction';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { TOKEN, USER_LOGIN } from '../../Util/Settings/Config';
import { Dropdown, Menu, Space } from 'antd';
const { TabPane } = Tabs;


function CheckOut(props) {

  const dispatch = useDispatch();
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhGheDangDat, danhSachGheKhachDangDat } = useSelector(state => state.QuanLyDatVeReducer);

  const buttonDatVe = danhGheDangDat.length === 0 ? true : false;

  useEffect(() => {
    dispatch(layChietPhongVe(props.match.params.id));
  },[]);

  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;


  const renderGhe = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
      let classGheDatDat = ghe.daDat === true ? 'gheDaDat' : '';
      let classGheDangDat = '';
      let classDaDuocDat = '';
      let classGheKhachDat = '';
      let indexGheDD = danhGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
      let indexGheKhachDat = danhSachGheKhachDangDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe);

      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classDaDuocDat = 'gheDaDuocDat'
      }
      if (indexGheDD !== -1) {
        classGheDangDat = 'gheDangDat'
      }

      if (indexGheKhachDat !== -1) {
        classGheKhachDat = 'gheKhachDat'
      }
      return <Fragment key={index}>
        <button onClick={() => {
          dispatch(datGheAction(ghe, props.match.params.id))
        }} disabled={ghe.daDat || classGheKhachDat !== ''} className={`ghe ${classGheKhachDat} ${classDaDuocDat} ${classGheDangDat} ${classGheVip} ${classGheDatDat}`}>{ghe.daDat ?

          classDaDuocDat !== '' ? <UserOutlined /> : <CloseOutlined /> : classGheKhachDat !== '' ? <SmileOutlined /> : ghe.stt
          }</button>
        {(index + 1) % 16 === 0 ? <br /> : ''}
      </Fragment>
    })
  }

  return (
    <div className='h-auto'>
      <div className='grid grid-cols-12'>
        <div className='col-span-8'>
          <div className='mt-5'>
            <div style={{ width: "74%", height: 10 }} className='bg-black mx-auto'></div>
            <div className={`${style['trapezium']}`}>
              <p className='text-center text-black'>Màn hình</p>
            </div>
            <div className='ml-14 mt-5'>
              {renderGhe()}
            </div>
          </div>
          <div className='mt-5'>
            <table className='min-w-full border-collapse block lg:table'>
              <thead className='block md:table-header-group'>
                <tr className=''>
                  <th>Ghế Chưa Đặt</th>
                  <th>Ghế Đã Đặt</th>
                  <th>Ghế Đang Đặt</th>
                  <th>Ghế Vip</th>
                  <th>Ghế Của Bạn</th>
                  <th>Ghế Sách Đang Đặt</th>
                </tr>
              </thead>
              <tbody className='w-full block md:table-header-group'>
                <tr className=''>
                  <td className='text-center'><button className='ghe'><CheckOutlined /></button></td>
                  <td className='text-center '><button className='ghe gheDaDat'><CheckOutlined /></button></td>
                  <td className='text-center'><button className='ghe gheDangDat'><CheckOutlined /></button></td>
                  <td className='text-center'><button className='ghe gheVip'><CheckOutlined /></button></td>
                  <td className='text-center'><button className='ghe gheDaDat'><UserOutlined /></button></td>
                  <td className='text-center'><button className='ghe gheKhachDat'><UserOutlined /></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='col-span-4 min-h-screen mt-11'>
          <h3 className='text-center text-2xl'>
            {danhGheDangDat.reduce((tongTien, ghe, index) => {
              return tongTien += ghe.giaVe;
            }, 0).toLocaleString()}đ</h3>
          <hr />
          <h3 className='text-green-400 text-2xl p-4 mb-0'>{thongTinPhim?.tenPhim}</h3>
          <hr />
          <p>Địa Chỉ : {thongTinPhim.diaChi} - {thongTinPhim.tenRap}</p>
          <p>Ngày Chiếu : {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
          <hr />
          <div className='grid grid-cols-5 py-5'>
            <div className='col-span-4 flex flex-wrap'>
              <p className='mb-1 ml-2'>Ghế : </p>
              {_.sortBy(danhGheDangDat, ['stt']).map((ghe, index) => {
                return <p key={index} className='bg-green-300 text-white w-6 text-center ml-2 mb-1'>{ghe.stt}</p>
              })}
            </div>
            <div className='col-span-1 text-center'>
              {danhGheDangDat.reduce((tongTien, ghe, index) => {
                return tongTien += ghe.giaVe;
              }, 0).toLocaleString()}đ
            </div>
          </div>
          <hr />
          <div className='py-3'>
            <i>Email</i><br />
            <p>{userLogin.email}</p>
          </div>
          <hr />
          <div className='py-3'>
            <i>Phone</i><br />
            <p>{userLogin.soDT}</p>
          </div>
          <hr />
          <div className='w-full flex items-end'>
            <button onClick={() => {
              const thongTinDatVe = new ThongTinDatVe();
              thongTinDatVe.maLichChieu = props.match.params.id;
              thongTinDatVe.danhSachVe = danhGheDangDat;
              dispatch(datVeAction(thongTinDatVe))
            }}
              disabled={buttonDatVe} className='bg-green-500 w-full py-2 text-2xl text-white'>Đặt Vé</button>
          </div>
        </div>
      </div>
    </div >
  )
}


export default function CheckOutTab(props) {

  const dispatch = useDispatch();

  const { tabActive } = useSelector(state => state.QuanLyDatVeReducer);

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

  useEffect(() => {
    dispatch({
      type: CHUYEN_TAB,
      number: '1'
    })
  }, []);

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <>
              <NavLink to={'/profile'} className='mr-5' onClick={() => {
              }}>
                Thông Tin Cá Nhân
              </NavLink>
              <hr className='mt-3' />
            </>
          ),
        },
        {
          key: '2',
          label: (
            <>
              <button className='mr-auto text-blue-400' onClick={() => {
                history.push('/home')
              }}
              >Trang Chủ</button>
              <hr className='mt-3' />
            </>

          ),
        },
        {
          key: '3',
          label: (
            <button className='mr-10 text-red-700' onClick={() => {
              history.push('/')
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(TOKEN);
              window.location.reload();
            }
            }>Đăng Xuất</button>
          ),
        },
      ]}
    />
  );

  const { history } = props;

  const opetation = <Fragment>
    {!_.isEmpty(userLogin) ? <Fragment>
      <Dropdown overlay={menu} className='mr-10'>
        <Space style={{ cursor: 'default' }}>
          Hello ! <span className='text-gray-400'>{userLogin.hoTen}</span>
        </Space>
      </Dropdown>
    </Fragment> : ''}
  </Fragment>;

  return (
    <div className='p-2 pl-5'>
      <Tabs tabBarExtraContent={opetation} defaultActiveKey={'1'} activeKey={tabActive} onChange={(key) => {
        dispatch({
          type: CHUYEN_TAB,
          number: key
        })
      }}>
        <TabPane tab='Chọn Ghế & Thanh Toán' key={'1'}>
          <CheckOut {...props} />
        </TabPane>
        <TabPane tab='Kết Quả Đặt Vé' key={'2'}>
          <KetQuaDatVe {...props} />
        </TabPane>
      </Tabs>
    </div >
  )
}

function KetQuaDatVe(props) {

  const dispatch = useDispatch();

  const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

  useEffect(() => {
    dispatch(layThongTinNguoiDung())
  }, []);

  const renderDanhGheDaDat = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((film, index) => {
      const firstFilm = _.first(film.danhSachGhe);
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={film.hinhAnh} />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">{film.tenPhim}</h2>
              <p className="text-gray-500">Giớ Chiếu : {moment(film.ngayDat).format('hh:mm A')} - Ngày Chiếu : {moment(film.ngayDat).format('DD:MM:YYYY')}</p>
              <p>Địa Điểm : {firstFilm.tenHeThongRap}</p>
              <p>Tên Rạp :{firstFilm.tenRap} - Số Ghế : {firstFilm.tenGhe}</p>
            </div>
          </div>
        </div>
      )
    })
  }
  return (
    <div className="container">
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch Sử Đặt Vé</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy danh thời gian để tẩn hưởng niềm vui với những khoảng khác sống động và hoành tránh của những bộ phim bom tấn đến từ dịch vụ phim chiếu rạp của chúng tôi</p>
          </div>
          <div className="flex flex-wrap -m-2">
            {renderDanhGheDaDat()}
          </div>
        </div>
      </section>
    </div>

  )
}