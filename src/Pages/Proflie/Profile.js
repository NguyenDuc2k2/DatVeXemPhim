/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTiNguoiDung, layThongTinNguoiDung } from '../../Redux/Action/QuanLyNguoiDungAction';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { GROUPID, TOKEN, USER_LOGIN } from '../../Util/Settings/Config';
import _ from 'lodash';
import moment from 'moment';
import { Dropdown, Menu, Space } from 'antd';


export default function Profile(props) {

  const dispatch = useDispatch();

  const [capNhat, setCapNhat] = useState(false)

  const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <>
              <button className='text-green-500' onClick={()=>{
                props.history.push('/admin/users')
              }}>Admin</button>
              <hr className='mt-3' />
            </>
          ),
        },
        {
          key: '2',
          label: (
            <>
              <button className='mr-10 text-blue-700' onClick={() => {
                props.history.push('/')
              }
              }> Trang Chủ</button>
              <hr className='mt-3' />
            </>
          ),

        },
        {
          key: '3',
          label: (
            <button className='mr-10 text-red-700' onClick={() => {
              props.history.push('/')
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


  useEffect(() => {
    dispatch(layThongTinNguoiDung());
  }, []);

  let hidePassword = '********************';

  const formikUpadteinformation = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinNguoiDung.taiKhoan,
      matKhau: hidePassword.slice(0, thongTinNguoiDung.matKhau?.length),
      email: thongTinNguoiDung.email,
      soDt: thongTinNguoiDung.soDT,
      maNhom: GROUPID,
      hoTen: thongTinNguoiDung.hoTen,
      xacNhanMatKhau: '',
      maLoaiNguoiDung: 'QuanTri',
    },
    onSubmit: async (values) => {
      await dispatch(capNhatThongTiNguoiDung(values));
      await setCapNhat(false)
    },
    validationSchema: Yup.object().shape({

      matKhau: Yup.string().required("Mật khẩu không được bỏ trống").min(8, 'Mật khẩu có tối thiểu 8 kí tự trở lên').max(20, 'Mật khẩu không quá 20 kí tự').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Mật không chưa hợp lệ"),

      xacNhanMatKhau: Yup.string().required("Xác nhận mất khẩu không được bỏ trống").oneOf([Yup.ref('matKhau')], 'Mật khẩu chưa đúng'),

      hoTen: Yup.string().required('Họ Tên không được bỏ trống').matches(/[a-zA-Z]/, 'Họ Tên chưa đúng').min(5, "Họ Tên có tối thiểu 5 kí tự"),

      email: Yup.string().required('Email không được bỏ trống').email("Email chưa đúng"),

      soDt: Yup.string().required("Số điện thoại không được bỏ trống").matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, "Số điện thoại chưa hợp lệ").min(10, 'Số điện thoại có tối thiểu 10 số').max(15, "Số điện thoại có tối đa 15 số"),
    }),
  });

  const lichSuDatVe = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((film, index) => {
      const firstFilm = _.first(film.danhSachGhe);
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full " key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={film.hinhAnh} />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">{film.tenPhim}</h2>
              <p className="text-gray-500">Giớ Chiếu : {moment(film.ngayDat).format('hh:mm A')} - Ngày Chiếu : {moment(film.ngayDat).format('DD:MM:YYYY')}</p>
              <p>Địa Điểm : {firstFilm.tenHeThongRap}</p>
              <p>Số Lượng Vé : {film.danhSachGhe.length}</p>
            </div>
          </div>
        </div>
      )
    })
  }

  const { handleChange, values, errors, handleSubmit } = formikUpadteinformation;

  return (
    <div className='bg-gray-200 container'>
      <div className='pt-2 flex items-center justify-between'>
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-0 text-gray-900">Thông Tin Tài Khoản</h1>
        <Dropdown overlay={menu} className='mr-10'>
          <Space style={{ cursor: 'default' }} className='text-xl text-right'>
            Hello ! <span className='text-gray-400'>{thongTinNguoiDung.hoTen}</span>
          </Space>
        </Dropdown>
      </div>
      <p className='w-full bg-black mt-4 ' style={{ height: 1 }}></p>
      <form onSubmit={handleSubmit} className='py-5'>
        <div className='gird grid-cols-12 w-2/5 mx-auto'>
          <div className='col-span-1 flex p-2 items-center justify-between mb-4'>
            <p className='mr-2 mb-0 text-lg '>Tài khoản : </p>
            <p className='text-lg mb-0 text-yellow-700 text-right' >{thongTinNguoiDung.taiKhoan}</p>
          </div>
          <hr className=' bg-black' style={{ height: 0.5 }} />
          <div>
            <div className='col-span-1 flex border-2 items-center p-2 justify-between'>
              <p className='mr-2 mb-0 text-lg w-2/12'>Họ Tên : </p>
              {!capNhat ? <p className='text-lg mb-0 text-yellow-700 '>{values.hoTen}</p> :
                <input name='hoTen' value={values.hoTen} className='border-none p-1' style={{ width: '60%' }} onChange={handleChange} />}
            </div>
            <p className='h-5 m-0 text-red-500 text-center'>{errors.hoTen}</p>
          </div>
          <hr className=' bg-black' style={{ height: 0.5 }} />
          <div>
            <div className='col-span-1 flex border-2 items-center justify-between p-2'>
              <p className='mr-2 mb-0 text-lg w-2/12'>SĐT : </p>
              {!capNhat ? <p className='text-lg mb-0 text-yellow-700'>{values.soDt}</p> :
                <input name='soDt' value={values.soDt} className='border-none p-1' style={{ width: '60%' }} onChange={handleChange} />}
            </div>
            <p className='h-5 m-0 text-red-500 text-center'>{errors.soDt}</p>
          </div>
          <hr className=' bg-black' style={{ height: 1 }} />
          <div>
            <div className='col-span-1 flex border-2 items-center p-2 justify-between'>
              <p className='mr-2 mb-0 text-lg w-2/12'>Email : </p>
              {!capNhat ? <p className='text-lg mb-0 text-yellow-700'>{values.email}</p> :
                <input name='email' value={values.email} className='border-none p-1' style={{ width: '60%' }} onChange={handleChange} />}
            </div>
            <p className='h-5 m-0 text-red-500 text-center'>{errors.email}</p>
          </div>
          <hr className=' bg-black' style={{ height: 0.5 }} />
          <div>
            <div className='col-span-1 flex border-2 items-center p-2 justify-between'>
              <p className='mr-2 mb-0 text-lg'>Mật khẩu : </p>
              {!capNhat ? <p className='text-lg mb-0 text-yellow-700'>{values.matKhau}</p> :
                <input name='matKhau' value={values.matKhau} type='password' className='border-none p-1' style={{ width: '60%' }} onChange={handleChange} />}
            </div>
            <p className='h-5 m-0 text-red-500 text-center'>{errors.matKhau}</p>
          </div>
          <hr className=' bg-black' style={{ height: 0.5 }} />
          <div>
            {!capNhat ? '' : <div className='col-span-1 flex border-2 items-center p-2 justify-between'>
              <p className='mr-2 mb-0 text-lg w-2/12'>Xác nhận mật khẩu : </p>
              <input name='xacNhanMatKhau' type='password' className='border-none p-1' style={{ width: '60%' }} onChange={handleChange} />
            </div>}
            <p className='h-5 m-0 text-red-500 text-center'>{errors.xacNhanMatKhau}</p>
          </div>
        </div>
        <div className='text-center mt-2'>
          {!capNhat ? <button type='submit' className='p-2 text-lg bg-blue-400 rounded-xl' onClick={(e) => {
            e.preventDefault();
            setCapNhat(true)
          }}>Chỉnh Sửa</button> : <>
            <hr className=' bg-black mx-auto' style={{ height: 0.5, width: '40%' }} />
            <button type='submit' className='p-2 text-lg bg-blue-400 rounded-xl mt-3'>Cập Nhật</button></>}
        </div>
      </form>
      <p className='w-full bg-black mt-4' style={{ height: 1 }}></p>
      <section className="text-gray-600 body-font mt-10">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch Sử Đặt Vé</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Cảm ơn bạn để tới và trải nghiệm các dịch giải trí của chúng tôi và rất mong được phục vụ quý khách nhiều hơn </p>
          </div>
          <div className="flex flex-wrap -m-2">
            {lichSuDatVe()}
          </div>
        </div>
      </section>
    </div>
  )
}
