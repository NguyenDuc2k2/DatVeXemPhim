import { SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU, SET_THONG_TIN_PHIM, SET_TAT_CA_PHIM } from "../Action/Type/QuanLyPhimType";
import { SET_CHI_TIET_PHIM } from "../Action/Type/QuanLyRapType";

const stateDefault = {
    arrFilm: [
    ],
    dangChieu: true,
    sapChieu: true,
    tatCaPhim: false,
    arrDefault: [],
    filmDetil: [],
    thongTinPhim: {},
};


export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {


        case SET_DANH_SACH_PHIM: {
            state.arrFilm = action.arrFilm;
            state.arrDefault = state.arrFilm;
            return { ...state }
        }

        case SET_PHIM_DANG_CHIEU: {
            state.arrFilm = state.arrDefault.filter(film => film.dangChieu === state.dangChieu)
            return { ...state, dangChieu: false, sapChieu: true, tatCaPhim: true }
        }

        case SET_PHIM_SAP_CHIEU: {
            state.arrFilm = state.arrDefault.filter(film => film.sapChieu === state.sapChieu)
            return { ...state, sapChieu: false, dangChieu: true, tatCaPhim: true }
        }

        case SET_TAT_CA_PHIM: {
            state.arrFilm = state.arrDefault;
            return { ...state, tatCaPhim: false, sapChieu: true, dangChieu: true }
        }

        case SET_CHI_TIET_PHIM: {
            return { ...state, filmDetil: action.chiTietPhim }
        }

        case SET_THONG_TIN_PHIM: {
            return { ...state, thongTinPhim: action.thongTinPhim }
        }

        default: {
            return { ...state }
        }
    }
}