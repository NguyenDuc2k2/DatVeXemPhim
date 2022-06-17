import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { dangNhapAction } from '../../Redux/Action/QuanLyNguoiDungAction';
import * as Yup from 'yup';

export default function Login(props) {

  const dispatch = useDispatch();

  const { loiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);


  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },

    onSubmit: (values) => {
      const action = {
        values,
        history: props.history,
      }

      dispatch(dangNhapAction(action))
    },

    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tài khoản không được bỏ trống").matches(/^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/, 'Tài khoản chưa hợp lệ').min(5, 'Tài khoản có tối thiểu 5 kí tự'),

      matKhau: Yup.string().required("Mật khẩu không được bỏ trống").min(8, 'Mật khẩu có tối thiểu 8 kí tự trở lên').max(20, 'Mật khẩu không quá 20 kí tự').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Mật không chưa hợp lệ"),
    })
  })
  return (
    <div className=" bg-gray-900 flex items-center justify-center py-32 px-96 h-screen relative" >
      <div className='absolute w-full h-full z-50' style={{ backgroundColor: '	rgba(0,0,0,0.25)' }}>
      </div>
      <div className='absolute w-full h-full blur-md' style={{ backgroundImage: 'url(http://picsum.photos/780/755)' }}>
      </div>
      <div className="bg-transparent text-gray-500 w-full overflow-hidden z-50" style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 54px 55px, rgba(0, 0, 0, 0.3) 0px -12px 30px, rgba(0, 0, 0, 0.3) 0px 4px 6px, rgba(0, 0, 0, 0.3) 0px 12px 13px, rgba(0, 0, 0, 0.3) 0px -3px 5px', backgroundColor: 'rgba(255,255,255,0.55)' }}>
        <div className="md:flex w-full">
          <div className="w-full py-5 px-5 md:px-0">
            <form onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }} className="w-full h-full">
              <div className="md:px-12 md:py-6  md:mx-6">
                <div className="text-center">
                  <img className="mx-auto w-48" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="logo" />
                </div>
                <div>
                  <p className="mb-6 text-black text-center font-bold" >Vui lòng đăng nhập tài khoản của bạn</p>
                  <div className="flex">
                    <div className="w-full px-3 mb-5">
                      <div className="group">
                        <input className='classInput' type="text" required name='taiKhoan' onChange={formik.handleChange} />
                        <span className="highlight" />
                        <span className="bar" />
                        <p className='text-red-600 h-1 font-bold mb-2 text-sm'>{formik.errors.taiKhoan}</p>
                        <label className='classLable'>Tài Khoản</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-full px-3 mb-5">
                      <div className="group">
                        <input className='classInput' type="password" required name='matKhau' onChange={formik.handleChange} />
                        <span className="highlight" />
                        <span className="bar" />
                        <p className='text-red-600 h-1 font-bold mb-2 text-sm'>{formik.errors.matKhau}</p>
                        <label className='classLable'>Mật Khẩu</label>
                      </div>
                    </div>
                  </div>
                  <div className="text-center pt-1 mb-4 pb-1">
                    <p className='text-red-600 h-5 font-bold mb-2 text-sm text-center'>{loiNguoiDung}</p>
                    <button type="submit" className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full" data-mdb-ripple="true" data-mdb-ripple-color="light" style={{
                      background: 'linear-gradient( to right,#ee7724,#d8363a,#dd3675,#b44593)'
                    }}>
                      Đăng Nhập
                    </button>
                  </div>
                  <div className="flex items-center before:flex-1 before:border-t before:border-black before:mt-0.5 after:flex-1 after:border-t after:border-black after:mt-0.5">
                    <p className="text-center font-semibold mb-0 text-black">Hoặc</p>
                  </div>
                  <div className="flex items-center justify-center pb-6 mt-4">
                    <button className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" onClick={() => {
                      props.history.push('/register')
                    }}>
                      Đăng Kí
                    </button>
                  </div>
                </div>
              </div>
            </form >
          </div>
        </div>
      </div>
    </div >
  )
}

