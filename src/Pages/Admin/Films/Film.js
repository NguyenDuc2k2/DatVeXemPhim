/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import { Table, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../Redux/Action/QuanLyPhimAction';
import { DeleteOutlined, EditOutlined,CalendarOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom';
const { Search } = Input;



export default function Film(props) {

  const dispatch = useDispatch();

  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);

  useEffect(() => {
    dispatch(layDanhSachPhimAction())
  }, []);

  const onSearch = (value) =>
    dispatch(layDanhSachPhimAction(value))

  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      sorter: (a, b) => a.maPhim - b.maPhim,
      width: '10%'
    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,
      width: '35%'
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      render: (text, film, index) => {
        return <Fragment>
          <img alt='' src={film.hinhAnh} className='w-12 h-12' onError={(e) => {
            e.target.onError = null;
            e.target.src = `http://picsum.photos/id/${index}/50/50`
          }} />
        </Fragment>
      },
      width: '8%'

    },
    {
      title: 'Mô Tả',
      dataIndex: 'moTa',
      render: (text, film) => {
        return <Fragment>
          {film.moTa.length > 50 ? film.moTa.substr(0, 50) + '...' : film.moTa}
        </Fragment>
      },
    },
    {
      title: 'Tác Vụ',
      dataIndex: 'maPhim',
      render: (text, film) => {
        return <Fragment>
          <button onClick={() => {
            if (window.confirm('Bạn có chắc muốn phim ' + film.tenPhim + ' không')) {
              dispatch(xoaPhimAction(film.maPhim))
            }
          }} key={1} className='text-white'><DeleteOutlined className='bg-red-400 p-3' /></button>
          <NavLink key={2} to={`/admin/films/edit/${film.maPhim}`} className='text-white'> <EditOutlined className='bg-blue-400 ml-1 p-3' /></NavLink>
          <NavLink key={3} to={`/admin/films/showtime/${film.maPhim}`} className='text-white'> <CalendarOutlined  className='bg-green-400 p-3 ml-1'/></NavLink>
        </Fragment>
      },
      width: '14%'
    },
  ];

  return (
    <div className='px-5 mt-3'>
      <h3 className='text-2xl'>Quản Lý Phim</h3>

      <Button onClick={
        () => { props.history.push('/admin/films/addnew') }
      }>Thêm Phim</Button>
      <Search
        className='my-5'
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{
          width: '100%',
        }}
      />
      <Table columns={columns} dataSource={arrFilm} rowKey={'maPhim'} />
    </div>

  )
}
