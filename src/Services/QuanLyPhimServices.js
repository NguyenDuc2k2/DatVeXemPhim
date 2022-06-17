/* eslint-disable no-useless-constructor */
import { GROUPID } from "../Util/Settings/Config";
import { BaseServices } from "./BaseServices";

class QuanLyPhimServices extends BaseServices {
    constructor() {
        super();
    }

    layDanhSachBanner = () => {
        return this.get(`api/QuanLyPhim/LayDanhSachBanner`)
    }

    layDanhSachPhim = (tenPhim='') => {
        if(tenPhim !== ''){
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`);
        }
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    }

    themPhimUploadHinh = (formatData)=>{
        return this.post('api/QuanLyPhim/ThemPhimUploadHinh',formatData)
    }

    layThongTinPhim =(maPhim)=>{
        return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }

    capNhatPhimUpload =(formData)=>{
        return this.post(`api/QuanLyPhim/CapNhatPhimUpload`,formData)
    }

    xoaPhim =(maPhim)=>{
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}


export const quanLyPhimServices = new QuanLyPhimServices();
