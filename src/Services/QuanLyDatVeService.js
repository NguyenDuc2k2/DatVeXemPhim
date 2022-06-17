/* eslint-disable new-parens */
/* eslint-disable no-useless-constructor */
import { ThongTinDatVe } from "../_Core/Models/ThongTinDatVe";
import { BaseServices } from "./BaseServices";

class QuanLyDatVeServices extends BaseServices {
    constructor() {
        super();
    }

    layChiTietPhonhVe = (maLichChieu) => {
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }

    datVe = (thongTinDatVe = new ThongTinDatVe) => {
        return this.post(`api/QuanLyDatVe/DatVe`, thongTinDatVe)
    }

    taoLichChieu = (thongTinLichChieu)=>{
        return this.post(`api/QuanLyDatVe/TaoLichChieu`,thongTinLichChieu)
    }

}


export const quanLyDatVeServices = new QuanLyDatVeServices();
