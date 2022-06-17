import { SET_CAROUSEL } from "../Action/Type/CarouselType"

const initialState = {
    arrImg: [
        {
            "maBanner": 1,
            "maPhim": 1282,
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png",
        }
    ]
}

export const CarouselReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case SET_CAROUSEL: {
            return { ...state, arrImg: action.arrImg }
        }

        default:
            return state
    }
}
