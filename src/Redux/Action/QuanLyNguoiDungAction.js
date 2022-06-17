import { quanLyNguoiDungServices } from '../../Services/QuanLyNguoiDung';
import { SUCCESS } from '../../Util/Settings/Config';
import { displayLoaddingAction, hideLoaddingAction } from './LoaddingAction';
import { DANG_NHAP_ACTION, SET_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_LOI_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG } from './Type/QuanLyNguoiDung';

export const dangNhapAction = (action) => {
    const { values, history } = action;
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungServices.dangNhapTaiKhoan(values);

            if (result.status === SUCCESS) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDanhNhap: result.data.content
                });

                dispatch({
                    type: SET_LOI_NGUOI_DUNG,
                    loiNguoiDung: '',
                })

                history.goBack();
            }

        } catch (error) {
            dispatch({
                type: SET_LOI_NGUOI_DUNG,
                loiNguoiDung: error.response.data.content,
            })
        }
    }
}



export const layThongTinNguoiDung = () => {
    return async dispatch => {
        try {
            dispatch(displayLoaddingAction);
            const result = await quanLyNguoiDungServices.layThongTinNguoiDung();
            if (result.status === SUCCESS) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
                await dispatch(hideLoaddingAction);
            }

        } catch (error) {
            alert('Lấy thông tin người dùng không thành công');
            await dispatch(hideLoaddingAction);
        }
    }
}

export const dangKiNguoiDung = (thongTinDangKi, history) => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungServices.dangKiTaiKhoan(thongTinDangKi);

            if (result.status === 200) {
                history.push('/login');
                dispatch({
                    type: SET_LOI_NGUOI_DUNG,
                    loiNguoiDung: '',
                })
            }

        } catch (error) {

            dispatch({
                type: SET_LOI_NGUOI_DUNG,
                loiNguoiDung: error.response.data.content,
            })
        }
    }
}


export const layDanhSachLoaiNguoiDung = () => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungServices.layDanhSachLoaiNguoiDung();

            if (result.status === 200) {
                dispatch({
                    type: SET_DANH_SACH_LOAI_NGUOI_DUNG,
                    danhSachLoaiNguoiDung: result.data.content
                })
            }

        } catch (error) {
            alert('Lấy danh sách loại người dùng không thành công')
        }
    }
}

export const capNhatThongTiNguoiDung = (thongTinMoi) => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungServices.capNhatThongTinNguoiDung(thongTinMoi);
            if (result.status === 200) {
                dispatch(layThongTinNguoiDung());
            }
        } catch (error) {
            alert(error.response.data.content);
        }
    }
}


export const layDanhSachNguoiDung = (taiKhoan = '') => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungServices.layDanhSachNguoiDung(taiKhoan);
            if (result.status === 200) {
                dispatch({
                    type: SET_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content,
                })
            }
        } catch (error) {
            alert('Lấy danh sách người dùng không thành công')
        }
    }
}


export const xoaNguoiDung = (taiKhoan) => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungServices.xoaNguoiDung(taiKhoan);
            if (result.status === 200) {
                dispatch(layDanhSachNguoiDung())
            }

        } catch (error) {
            alert(error.response.data.content)
        }
    }
}

export const themNguoiDungAction = (thongTinNguoiDung, history) => {

    return async dispatch => {
        try {
            const result = await quanLyNguoiDungServices.themNguoiDung(thongTinNguoiDung);
            if (result.status === 200) {
                history.push('/admin/users')
            }
        } catch (error) {
            alert(error.response.data.content)
        }
    }
}

export const updateThongTinNguoiDung = (thongTinNguoiDung, history) => {
    return async dispatch => {
        try {
            const result = await quanLyNguoiDungServices.updateThongTinNguoiDung(thongTinNguoiDung);
            if (result.status === 200) {
                history.push('/admin/users')
            }
        } catch (error) {
            alert(error.response.data.content)
        }
    }
}

