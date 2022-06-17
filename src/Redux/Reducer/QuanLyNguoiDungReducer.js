import { DANG_NHAP_ACTION, SET_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_LOI_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG_EDIT } from "../Action/Type/QuanLyNguoiDung";
import { USER_LOGIN, TOKEN } from '../../Util/Settings/Config';

let user = {};

if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
  userLogin: user,
  thongTinNguoiDung: {},
  danhSachLoaiNguoiDung: [],
  danhSachNguoiDung: [],
  thongTinNguoiDungEdit: {},
  loiNguoiDung: '',
}

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {

    case DANG_NHAP_ACTION: {
      const { thongTinDanhNhap } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDanhNhap));
      localStorage.setItem(TOKEN, thongTinDanhNhap.accessToken);
      return { ...state, userLogin: thongTinDanhNhap }
    }

    case SET_THONG_TIN_NGUOI_DUNG: {
      return { ...state, thongTinNguoiDung: action.thongTinNguoiDung }
    }

    case SET_DANH_SACH_LOAI_NGUOI_DUNG: {
      return { ...state, danhSachLoaiNguoiDung: action.danhSachLoaiNguoiDung }
    }

    case SET_DANH_SACH_NGUOI_DUNG: {
      return { ...state, danhSachNguoiDung: action.danhSachNguoiDung }
    }

    case SET_THONG_TIN_NGUOI_DUNG_EDIT: {
      return { ...state, thongTinNguoiDungEdit: action.thongTinNguoiDungEdit };
    }

    case SET_LOI_NGUOI_DUNG:{
      return {...state,loiNguoiDung:action.loiNguoiDung}
    }



    default:
      return state
  }
}
