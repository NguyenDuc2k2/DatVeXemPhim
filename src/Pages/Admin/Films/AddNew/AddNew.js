import React, { useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Switch } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinh } from '../../../../Redux/Action/QuanLyPhimAction';
import { GROUPID } from '../../../../Util/Settings/Config';

export default function AddNew() {

    const dispatch = useDispatch();
    const [imtSrc, setImgSrc] = useState('');

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: true,
            hot: true,
            danhGia: 0,
            hinhAnh: {},
            maNhom: GROUPID,

        },

        onSubmit: (values) => {
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }
            dispatch(themPhimUploadHinh(formData))
        }
    });

    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
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

    const handleChangeFile = (e) => {
        let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImgSrc(e.target.result)
            }
        formik.setFieldValue('hinhAnh', file)
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
                <h3 className='text-center text-2xl px-5'>Th??m Phim M???i</h3>
                <Form.Item label="T??n Phim" name={'tenPhim'}>
                    <Input name='tenPhim' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Trailer" name={'trailer'}>
                    <Input name='trailer' onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="M?? t???">
                    <Input name={'moTa'} onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Ng??y Kh???i Chi???u" >
                    <DatePicker name={'ngayKhoiChieu'} format={"DD-MM-YYYY"} onChange={handleChangeDatePicker} />
                </Form.Item>
                <Form.Item label="??ang Chi???u" >
                    <Switch onChange={handleChaneSwitch('dangChieu')} />
                </Form.Item>
                <Form.Item label="S???p Chi???u" valuePropName="checked">
                    <Switch onChange={handleChaneSwitch('sapChieu')} />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handleChaneSwitch('hot')} />
                </Form.Item>
                <Form.Item label="S??? Sao">
                    <InputNumber max={5} onChange={handleChangeInputNumber('danhGia')} />
                </Form.Item>
                <Form.Item label="H??nh ???nh">
                    <input type={'file'} onChange={handleChangeFile} accept='img/png img/jpeg' />
                    <img src={imtSrc} style={{ width: 150, height: 150, marginTop: 10 }} alt='...' />
                </Form.Item>
                <Form.Item label="T??c V???">
                    <button type='submit'>Th??m Phim</button>
                </Form.Item>
            </Form></>
    );
}
