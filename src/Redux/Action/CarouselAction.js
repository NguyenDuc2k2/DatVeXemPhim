import { quanLyPhimServices } from "../../Services/QuanLyPhimServices";
import { SET_CAROUSEL } from "./Type/CarouselType";

export const getCarouselAction = async (dispatch) => {
    try {
        const result = await quanLyPhimServices.layDanhSachBanner();

        dispatch({
            type: SET_CAROUSEL,
            arrImg: result.data.content
        })

    } catch (error) {
        alert('Lấy banner không thành công')
    }
}