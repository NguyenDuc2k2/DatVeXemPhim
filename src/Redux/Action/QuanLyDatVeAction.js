import { quanLyDatVeServices } from '../../Services/QuanLyDatVeService';
import { SUCCESS } from '../../Util/Settings/Config';
import { ThongTinDatVe } from '../../_Core/Models/ThongTinDatVe';
import { displayLoaddingAction, hideLoaddingAction } from './LoaddingAction';
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from './Type/QuanLyDatVeType';


export const layChietPhongVe = (maPhongVe) => {
    return async dispatch => {
        try {
            dispatch(displayLoaddingAction);
            const result = await quanLyDatVeServices.layChiTietPhonhVe(maPhongVe);
            if (result.status === SUCCESS) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content,
                });
                await dispatch(hideLoaddingAction);

            }

        } catch (error) {
            alert('Lấy chi tiết phóng vé không thành công');
            await dispatch(hideLoaddingAction);
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch, getState) => {
        try {

            dispatch(displayLoaddingAction);

            await quanLyDatVeServices.datVe(thongTinDatVe);

            await dispatch(layChietPhongVe(thongTinDatVe.maLichChieu));

            await dispatch({ type: DAT_VE_HOAN_TAT });

            await dispatch(hideLoaddingAction);

            await dispatch({ type: CHUYEN_TAB, number: '2' });

        } catch (error) {
            dispatch(hideLoaddingAction)
            alert('Hiện tại không đặt được vé')
        }
    }
}



export const datGheAction = (ghe, maLichChieu) => {
    return async (dispatch, getState) => {
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe,
        });
    }
}