/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, DatePicker, InputNumber, Button, Select } from 'antd';
import { quanLyRapServices } from '../../../Services/QuanLyRap';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeServices } from '../../../Services/QuanLyDatVeService';

export default function Showtime(props) {

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: '',
    },
    onSubmit: async (values) => {
      try {
        await quanLyDatVeServices.taoLichChieu(values);

      } catch (error) {
        alert('Tạo lịch chiếu không thành công')
      }
    }

  })

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  const getHeThongRap = async () => {
    try {
      let result = await quanLyRapServices.layThongTinHeThongRap();
      if (result.status === 200) {
        setState({
          ...state,
          heThongRapChieu: result.data.content
        });

      }
    } catch (error) {
      alert('Lấy hệ thống rạp không thành công')
    }
  }

  useEffect(() => {
    getHeThongRap();
  }, []);

  const handleChangeHeThongRap = async (values) => {
    try {

      let result = await quanLyRapServices.layThongTinCumRap(values);

      setState({
        ...state,
        cumRapChieu: result.data.content
      })

    } catch (error) {
      alert('Lấy hệ thống rạp thành công')
    }
  }

  const handleChangeCumRap = (values) => {
    formik.setFieldValue('maRap', values);
  }

  const onOk = (values) => {
    const time = moment(values).format('DD/MM/YYYY hh:mm:ss');
    formik.setFieldValue('ngayChieuGioChieu', time);
  }

  const onChangeDate = (values) => {
    const time = moment(values).format('DD/MM/YYYY hh:mm:ss');
    formik.setFieldValue('ngayChieuGioChieu', time);
  }

  const onChangeNumber = (values) => {
    formik.setFieldValue('giaVe', values)
  }
  return (
    <div className='container'>
      <Form
        labelCol={{
          span: 8,
        }}
        onSubmitCapture={formik.handleSubmit}
      >
        <h3 className='text-center text-2xl mb-5'>Tạo Lịch Chiếu</h3>
        <Form.Item
          label="Hệ Thống Rạp">
          <Select options={state.heThongRapChieu?.map((htr, index) => ({
            label: htr.tenHeThongRap, value: htr.tenHeThongRap
          }))} onChange={handleChangeHeThongRap} placeholder='Chọn hệ thống rạp' />
        </Form.Item>
        <Form.Item
          label="Cụm Rạp">
          <Select options={state.cumRapChieu?.map((cumRap, index) => ({
            label: cumRap.tenCumRap, value: cumRap.maCumRap
          }))} onChange={handleChangeCumRap} placeholder='Cụm rạp' />
        </Form.Item>
        <Form.Item
          label="Chọn Ngày Giờ Chiếu">
          <DatePicker format='DD/MM/YYYY hh:mm:ss' showTime onChange={onChangeDate} onOk={onOk} />
        </Form.Item>
        <Form.Item
          label="Chọn Giá Vé">
          <InputNumber onChange={onChangeNumber} min={30000} max={150000} />
        </Form.Item>
        <Form.Item className='mt-10 text-center'>
          <Button htmlType='submit'>Tạo Lịch Chiếu</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
