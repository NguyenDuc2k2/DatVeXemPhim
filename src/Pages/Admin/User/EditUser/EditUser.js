/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layDanhSachLoaiNguoiDung, updateThongTinNguoiDung } from '../../../../Redux/Action/QuanLyNguoiDungAction';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { GROUPID } from '../../../../Util/Settings/Config';

export default function EditUser(props) {

    const dispatch = useDispatch();

    const { danhSachLoaiNguoiDung, thongTinNguoiDungEdit } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        dispatch(layDanhSachLoaiNguoiDung());
    }, []);

    const formikEditUser = useFormik({
        enableReinitialize: true,
        initialValues: {
            matKhau: thongTinNguoiDungEdit.matKhau,
            email: thongTinNguoiDungEdit.email,
            soDt: thongTinNguoiDungEdit.soDt,
            maNhom: GROUPID,
            maLoaiNguoiDung: thongTinNguoiDungEdit.maLoaiNguoiDung,
            hoTen: thongTinNguoiDungEdit.hoTen,
            xacNhanMatKhau: '',
        },
        onSubmit: (values) => {
            dispatch(updateThongTinNguoiDung(values, props.history))
        },
        validationSchema: Yup.object().shape({

            taiKhoan: Yup.string().required("Tài khoản không được bỏ trống").matches(/^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/, 'Tài khoản chưa hợp lệ').min(5, 'Tài khoản phải có tối thiểu 5 kí tự'),

            matKhau: Yup.string().required("Mật khẩu không được bỏ trống").min(8, 'Mật khẩu phải có tối thiểu 8 kí tự trở lên').max(20, 'Mật khẩu không quá 20 kí tự').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Mật không chưa hợp lệ"),

            xacNhanMatKhau: Yup.string().required("Xác nhận mất khẩu không được bỏ trống").oneOf([Yup.ref('matKhau')], 'Mật khẩu chưa đúng'),

            hoTen: Yup.string().required('Họ Tên không được bỏ trống').matches(/[a-zA-Z]/, 'Họ Tên chưa đúng').min(5, "Họ tên phải có tối thiểu 5 kí tự"),

            email: Yup.string().required('Email không được bỏ trống').email("Email chưa đúng"),

            soDt: Yup.string().required("Số điện thoại không được bỏ trống").matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, "Số điện thoại chưa hợp lệ").min(10, 'Số điện thoại phải có tối thiểu 10 số').max(15, "Số điện thoại có tối đa 15 số"),
        }),
    });

    const { handleSubmit, handleChange, errors, values } = formikEditUser;

    return (
        <div className='container'>
            <div className='pt-2 px-36'>
                <h3 className='text-3xl text-center'>Chỉnh Sửa Thông Tin Người Dùng</h3>
                <div className=''>
                    <p className="w-full text-center text-xl text-blue-400">Tài Khoản : {thongTinNguoiDungEdit.taiKhoan}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="group">
                        <input className='inputUser' defaultValue={values.hoTen} type="text" required name='hoTen' onChange={handleChange} />
                        <span className="highlight" />
                        <span className="bar" />
                        <p className='text-red-500 h-1 text-sm'>{errors.hoTen}</p>
                        <label className='labelUser'> Họ Tên</label>
                    </div>
                    <div className="group">
                        <input className='inputUser' defaultValue={values.soDt} type="text" required name='soDt' onChange={handleChange} />
                        <span className="highlight" />
                        <span className="bar" />
                        <p className='text-red-500 h-1 text-sm'>{errors.soDt}</p>
                        <label className='labelUser'>Số Điện Thoại</label>
                    </div>
                    <div className="group">
                        <input className='inputUser' defaultValue={values.email} type="mail" required name='email' onChange={handleChange} />
                        <span className="highlight" />
                        <span className="bar" />
                        <p className='text-red-500 h-1 text-sm'>{errors.email}</p>
                        <label className='labelUser'>Email</label>
                    </div>
                    <div className="group">
                        <input className='inputUser' defaultValue={values.matKhau} type="passWord" required name='matKhau' onChange={handleChange} />
                        <span className="highlight" />
                        <span className="bar" />
                        <p className='text-red-500 h-1 text-sm'>{errors.matKhau}</p>
                        <label className='labelUser'>Mật Khẩu</label>
                    </div>
                    <div className="group">
                        <input className='inputUser' type="passWord" required name='xacNhanMatKhau' onChange={handleChange} />
                        <span className="highlight" />
                        <span className="bar" />
                        <p className='text-red-500 h-1 text-sm'>{errors.xacNhanMatKhau}</p>
                        <label className='labelUser'>Xác Nhận Mật Khẩu</label>
                    </div>
                    <div className='text-center mt-4 flex justify-between'>
                        <div className=''>
                            <p className='mb-1'>Loại Người Dùng</p>
                            <select name='maLoaiNguoiDung' defaultValue={values.maLoaiNguoiDung} className="w-full px-7 py-1 rounded-md border border-slate-400" onChange={handleChange}>{
                                danhSachLoaiNguoiDung.map((nguoiDung, index) => {
                                    return <option key={index} value={nguoiDung.maLoaiNguoiDung}>{nguoiDung.tenLoai}</option>
                                })
                            } </select>
                        </div>
                        <div>
                            <button className='px-5 py-2 rounded-lg bg-yellow-400 mt-5' type='submit'>Lưu Thông Tin</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
