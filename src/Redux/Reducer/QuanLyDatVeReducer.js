import { ThongTinPhongVe } from "../../_Core/Models/ThongTinPhongVe"
import { CHUYEN_TAB, DAT_GHE, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../Action/Type/QuanLyDatVeType"

const initialState = {
    chiTietPhongVe: new ThongTinPhongVe(),
    danhGheDangDat: [],
    danhSachGheKhachDangDat: [
        { maGhe: 24324234 }
    ],
    tabActive: '1',

}

export const QuanLyDatVeReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CHI_TIET_PHONG_VE: {

            return { ...state, chiTietPhongVe: action.chiTietPhongVe }
        }

        case DAT_VE: {
            const danhSachGheCapNhap = [...state.danhGheDangDat]

            let index = danhSachGheCapNhap.findIndex(ghe => ghe.maGhe === action.gheDuocChon.maGhe);

            if (index !== -1) {
                danhSachGheCapNhap.splice(index, 1);
            } else {
                danhSachGheCapNhap.push(action.gheDuocChon)
            }

            state.danhGheDangDat = [...danhSachGheCapNhap];
            return { ...state }
        }

        case DAT_VE_HOAN_TAT: {
            return { ...state, danhGheDangDat: [] }
        }

        case CHUYEN_TAB: {
            return { ...state, tabActive: action.number }
        }
        case DAT_GHE:{
            return {...state,danhSachGheKhachDangDat:action.arrGheKhachDat}
        }
        default:
            return state
    }
}

