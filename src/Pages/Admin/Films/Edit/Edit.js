/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Switch } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUpload, layDanhSachPhimAction, layThongTinPhimAction } from '../../../../Redux/Action/QuanLyPhimAction';
import { GROUPID } from '../../../../Util/Settings/Config';

export default function Edit(props) {

    const dispatch = useDispatch();

    const [imtSrc, setImgSrc] = useState('');

    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);

    useEffect(() => {
        let { id } = props.match.params;
        dispatch(layThongTinPhimAction(id))
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim?.maPhim,
            tenPhim: thongTinPhim?.tenPhim,
            trailer: thongTinPhim?.trailer,
            moTa: thongTinPhim?.moTa,
            ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
            dangChieu: thongTinPhim?.dangChieu,
            sapChieu: thongTinPhim?.sapChieu,
            hot: thongTinPhim?.hot,
            danhGia: thongTinPhim?.danhGia,
            hinhAnh: null,
            maNhom: GROUPID,

        },

        onSubmit: (values) => {
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }
            dispatch(capNhatPhimUpload(formData,props.history))
        }
    });

    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value).format('DD-MM-YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    };

    const handleChaneSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }

    const handleChangeFile = async (e) => {
        let file = e.target.files[0];

        await formik.setFieldValue('hinhAnh', file);

        let reader = new FileReader();

        reader.readAsDataURL(file)

        reader.onload = (e) => {
            setImgSrc(e.target.result)
        }
    }
    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: 'default',
                }}
                size={'default'}
                onSubmitCapture={formik.handleSubmit}
            >
                <h3 className='text-center text-2xl px-5'>Thêm Phim Mới</h3>
                <Form.Item label="Tên Phim">
                    <Input name={'tenPhim'} onChange={formik.handleChange} value={formik.values.tenPhim} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name={'trailer'} onChange={formik.handleChange} value={formik.values.trailer} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name={'moTa'} onChange={formik.handleChange} value={formik.values.moTa} />
                </Form.Item>
                <Form.Item label="Ngày Khởi Chiếu" >
                    <DatePicker name={'ngayKhoiChieu'} format={"DD-MM-YYYY"} onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu, 'DD-MM-YYYY')} />
                </Form.Item>
                <Form.Item label="Đang Chiếu" >
                    <Switch onChange={handleChaneSwitch('dangChieu')} checked={formik.values.dangChieu} />
                </Form.Item>
                <Form.Item label="Sắp Chiếu" valuePropName="checked">
                    <Switch onChange={handleChaneSwitch('sapChieu')} checked={formik.values.sapChieu} />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handleChaneSwitch('hot')} checked={formik.values.hot} />
                </Form.Item>
                <Form.Item label="Số Sao">
                    <InputNumber max={5} onChange={handleChangeInputNumber('danhGia')} value={formik.values.danhGia} />
                </Form.Item>
                <Form.Item label="Hình Ảnh">
                    <input type={'file'} onChange={handleChangeFile} accept='img/png img/jpeg' />
                    <img src={imtSrc === '' ? thongTinPhim.hinhAnh : imtSrc} style={{ width: 150, height: 150, marginTop: 10 }} alt='' />
                </Form.Item>
                <Form.Item className='text-center'>
                    <button type='submit' className='py-1 px-3 text-white bg-blue-400'>Cập Nhật</button>
                </Form.Item>
            </Form></>
    );
}
