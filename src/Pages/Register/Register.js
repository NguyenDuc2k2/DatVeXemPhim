import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GROUPID } from '../../Util/Settings/Config';
import { useDispatch ,useSelector} from 'react-redux';
import { dangKiNguoiDung } from '../../Redux/Action/QuanLyNguoiDungAction';
import './Register.css';

export default function Register(props) {

  const dispatch = useDispatch();

  const {loiNguoiDung} = useSelector(state=> state.QuanLyNguoiDungReducer);

  const formikRegister = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUPID,
      hoTen: "",
      xacNhanMatKhau: ''
    },
    onSubmit: (values) => {
      console.log(values)
      dispatch(dangKiNguoiDung(values, props.history))
    },
    validationSchema: Yup.object().shape({

      taiKhoan: Yup.string().required("Tài khoản không được bỏ trống").matches(/^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/, 'Tài khoản chưa hợp lệ').min(5, 'Tài khoản có tối thiểu 5 kí tự'),

      matKhau: Yup.string().required("Mật khẩu không được bỏ trống").min(8, 'Mật khẩu có tối thiểu 8 kí tự trở lên').max(20, 'Mật khẩu không quá 20 kí tự').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Mật không chưa hợp lệ"),

      xacNhanMatKhau: Yup.string().required("Xác nhận mất khẩu không được bỏ trống").oneOf([Yup.ref('matKhau')], 'Mật khẩu chưa đúng'),

      hoTen: Yup.string().required('Họ Tên không được bỏ trống').matches(/[a-zA-Z]/, 'Họ Tên chưa đúng').min(5, "Họ Tên có tối thiểu 5 kí tự"),

      email: Yup.string().required('Email không được bỏ trống').email("Email chưa đúng"),

      soDt: Yup.string().required("Số điện thoại không được bỏ trống").matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, "Số điện thoại chưa hợp lệ").min(10, 'Số điện thoại có tối thiểu 10 số').max(15, "Số điện thoại có tối đa 15 số"),
    }),
  });

  return (
    <div className=" bg-gray-900 flex items-center justify-center py-32 px-96 h-screen relative" >
      <div className='absolute w-full h-full z-50' style={{ backgroundColor: '	rgba(0,0,0,0.25)' }}>
      </div>
      <div className='absolute w-full h-full blur-md' style={{ backgroundImage: 'url(http://picsum.photos/780/755)' }}>
      </div>
      <div className="bg-transparent text-gray-500 w-full overflow-hidden z-50" style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 54px 55px, rgba(0, 0, 0, 0.3) 0px -12px 30px, rgba(0, 0, 0, 0.3) 0px 4px 6px, rgba(0, 0, 0, 0.3) 0px 12px 13px, rgba(0, 0, 0, 0.3) 0px -3px 5px', backgroundColor: 'rgba(255,255,255,0.4)' }}>
        <div className="md:flex w-full">
          <div className="w-full py-5 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">Đăng Kí</h1>
            </div>
            <form onSubmit={formikRegister.handleSubmit}>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-1">
                <div className="group">
                    <input className='classInput' type="text" required name='hoTen' onChange={formikRegister.handleChange} />
                    <span className="highlight" />
                    <span className="bar" />
                    <p className='text-red-500 h-1 font-bold mb-2 text-sm'>{formikRegister.errors.hoTen}</p>
                    <label className='classLable'> Họ Tên</label>
                  </div>
                </div>
                <div className="w-1/2 px-3 mb-1">
                  <div className="group">
                    <input className='classInput' type="text" required name='soDt' onChange={formikRegister.handleChange} />
                    <span className="highlight" />
                    <span className="bar" />
                    <p className='text-red-500 h-1 font-bold mb-2 text-sm'>{formikRegister.errors.soDt}</p>
                    <label className='classLable'> Số Điện Thoại</label>
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-1">
                  <div className="group">
                    <input className='classInput' type="mail" required name='email' onChange={formikRegister.handleChange} />
                    <span className="highlight" />
                    <span className="bar" />
                    <p className='text-red-500 h-1 font-bold mb-2 text-sm'>{formikRegister.errors.email}</p>
                    <label className='classLable'> Email</label>
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-1">
                  <div className="group">
                    <input className='classInput' type="text" required name='taiKhoan' onChange={formikRegister.handleChange} />
                    <span className="highlight" />
                    <span className="bar" />
                    <p className='text-red-500 h-1 font-bold mb-2 text-sm'  >{formikRegister.errors.taiKhoan}</p>
                    <label className='classLable'> Tài Khoản</label>
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-1">
                  <div className="group">
                    <input className='classInput' type="password" required name='matKhau' onChange={formikRegister.handleChange} />
                    <span className="highlight" />
                    <span className="bar" />
                    <p className='text-red-500  h-1 font-bold mb-2 text-sm'>{formikRegister.errors.matKhau}</p>
                    <label className='classLable'> Mật Khẩu</label>
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-1">
                  <div className="group">
                    <input className='classInput' type="password" required name='xacNhanMatKhau' onChange={formikRegister.handleChange} />
                    <span className="highlight" />
                    <span className="bar" />
                    <p className='text-red-500 h-1 font-bold mb-2 text-sm'>{formikRegister.errors.xacNhanMatKhau}</p>
                    <label className='classLable'> Xác Nhận Mật Khẩu</label>
                  </div>
                </div>
              </div>
              <div className="flex mx-3">
                <div className="w-full px-3 mb-3">
                <p className='text-red-500 h-5 font-bold mb-2 text-sm text-center'>{loiNguoiDung}</p>
                  <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold">Đăng Kí Ngay</button>
                </div>
              </div>
              <div className="flex items-center before:flex-1 before:border-t before:border-black before:mt-0.5 after:flex-1 after:border-t after:border-black after:mt-0.5">
                <p className="text-center font-semibold mb-0 text-black">Hoặc</p>
              </div>
              <div className="flex mt-3">
                <div className="w-full px-3">
                  <button className="block max-w-xs mx-auto bg-green-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"
                    onClick={() => {
                      props.history.push('/login');
                    }}>Đăng Nhập</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}
