/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDung, xoaNguoiDung } from '../../../Redux/Action/QuanLyNguoiDungAction';
import { Table, Input, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { SET_THONG_TIN_NGUOI_DUNG_EDIT } from '../../../Redux/Action/Type/QuanLyNguoiDung';
const { Search } = Input;

export default function User(props) {


  const dispatch = useDispatch();

  const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

  let hidePassword = '**********************';


  useEffect(() => {
    dispatch(layDanhSachNguoiDung())
  }, []);

  const onSearch = (value) => {
    dispatch(layDanhSachNguoiDung(value))
  };



  const columns = [
    {
      title: 'Tài Khoản',
      dataIndex: 'taiKhoan',
      width: '15%',
      sorter: (a, b) => a.taiKhoan.length - b.taiKhoan.length,
    },
    {
      title: 'Họ Tên',
      dataIndex: 'hoTen',
      width: '17%',
      sorter: (a, b) => a.hoTen.length - b.hoTen.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '17%',
    },

    {
      title: 'Mật Khẩu',
      dataIndex: 'matKhau',
      width: '17%',
      render: (text) => {
        if (text === null) {
          return <p></p>
        }
        return <p>{hidePassword.slice(0, text.length)}</p>
      }
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
      width: '17%'
    },
    {
      title: 'Tác Vụ',
      dataIndex: 'taiKhoan',
      width: '15%',
      render: (text, user) => {
        return <Fragment>
          <button onClick={() => {
            if (window.confirm('Bạn có chắc muốn xóa tài khoản ' + user.taiKhoan + ' không')) {
              dispatch(xoaNguoiDung(user.taiKhoan))
            }
          }} key={1} className='text-white'><DeleteOutlined className='bg-red-400 p-3' /></button>
          <button key={2} className='text-white' onClick={() => {
            props.history.push(`/admin/users/edit/${user.taiKhoan}`)
            dispatch({
              type: SET_THONG_TIN_NGUOI_DUNG_EDIT,
              thongTinNguoiDungEdit: user,
            })
          }}> <EditOutlined className='bg-blue-400 ml-1 p-3' /></button>

        </Fragment>
      }
    },

  ];


  return (
    <div className='pt-3'>
      <div className='px-5'>
        <h3 className='text-xl text-center'>Quản Lý Người Dùng</h3>
        <Button onClick={() => {
          props.history.push('/admin/users/addnew')
        }}>Thêm Người Dùng</Button>
        <Search
          className='my-5'
          placeholder="Tìm kiếm tài khoản"
          allowClear
          onSearch={onSearch}
          style={{
            width: '100%',
          }}
        />
        <Table columns={columns} dataSource={danhSachNguoiDung} rowKey={'taiKhoan'} />
      </div>
    </div>
  )
}
