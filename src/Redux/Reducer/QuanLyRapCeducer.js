import { SET_HE_THONG_CHIEU } from '../Action/Type/QuanLyRapType'
const stateDefault = {
    heThongRap: []
}

export const QuanLyRapReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case SET_HE_THONG_CHIEU: {
            return { ...state, heThongRap: action.heThongRap }
        }
        default:
            return state
    }
}
