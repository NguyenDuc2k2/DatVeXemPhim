/* eslint-disable no-useless-constructor */
import { GROUPID } from "../Util/Settings/Config";
import { BaseServices } from "./BaseServices";

class QuanLyRapServices extends BaseServices {
    constructor() {
        super();
    }

    layThongTinLichChieuHeThongRap = () => {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }


    layThongTinLichChieuPhim =(maPhim)=>{
        return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }

    layThongTinHeThongRap =()=>{
        return this.get(`api/QuanLyRap/LayThongTinHeThongRap`)
    }

    layThongTinCumRap=(maHeThongRap)=>{
        return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
}


export const quanLyRapServices = new QuanLyRapServices();
