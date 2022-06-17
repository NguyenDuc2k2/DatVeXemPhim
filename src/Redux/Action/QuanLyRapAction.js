import { quanLyRapServices } from "../../Services/QuanLyRap";
import { SET_CHI_TIET_PHIM, SET_HE_THONG_CHIEU } from './Type/QuanLyRapType'

export const layDanhSachHeThongRapAction = () => {

    return async dispatch => {
        try {
            const result = await quanLyRapServices.layThongTinLichChieuHeThongRap();
            if (result.status === 200) {
                dispatch({
                    type: SET_HE_THONG_CHIEU,
                    heThongRap: result.data.content,
                })
            }
        } catch (error) {
            alert('Lấy hệ thống rạp không thành công')
        }
    }
}

export const layThongTinLichChieuPhim = (id) => {
    return async dispatch => {
        try {
            const result = await quanLyRapServices.layThongTinLichChieuPhim(id);
            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHIM,
                    chiTietPhim: result.data.content,
                })
            }
        } catch (error) {
            alert('Lấy thông tin lịch chiếu phim không thành công')
        }
    }
}