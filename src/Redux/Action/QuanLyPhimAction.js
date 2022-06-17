import { quanLyPhimServices } from "../../Services/QuanLyPhimServices";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./Type/QuanLyPhimType";

export const layDanhSachPhimAction = (tenPhim = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimServices.layDanhSachPhim(tenPhim);
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            })

        } catch (error) {
            alert('Lấy danh sách phim không thành công')
        }
    }
}

export const themPhimUploadHinh = (formData) => {
    return async dispatch => {
        try {
            await quanLyPhimServices.themPhimUploadHinh(formData);
            alert("Thêm phim thành công")
        } catch (error) {
            alert('Thêm phim không thành công')
        }
    }
}


export const layThongTinPhimAction = (maPhim) => {
    return async dispatch => {
        try {
            const result = await quanLyPhimServices.layThongTinPhim(maPhim);

            await dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })
        } catch (error) {
            alert('Lấy thông tin phim không thành công')
        }
    }
}

export const capNhatPhimUpload = (fromData, history) => {
    return async dispatch => {

        try {
            await quanLyPhimServices.capNhatPhimUpload(fromData);

            history.push('/admin/films')

            dispatch(layDanhSachPhimAction())

        } catch (error) {
            alert('Cập nhật phim thành công')
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async dispatch => {
        try {
            await quanLyPhimServices.xoaPhim(maPhim);

            alert("Xóa phim Thành Công");

            dispatch(layDanhSachPhimAction())

        } catch (error) {
            alert('Xóa phim không thành công')
        }
    }
}