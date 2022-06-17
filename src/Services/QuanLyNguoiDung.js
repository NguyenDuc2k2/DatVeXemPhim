/* eslint-disable no-useless-constructor */
import { GROUPID } from "../Util/Settings/Config";
import { BaseServices } from "./BaseServices";

class QuanLyNguoiDungServices extends BaseServices {
    constructor() {
        super();
    }

    dangNhapTaiKhoan = (thongTinDangNhap) => {
        return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap)
    }

    layThongTinNguoiDung = () => {
        return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }

    dangKiTaiKhoan = (thongTinDangKi) => {
        return this.post(`api/QuanLyNguoiDung/DangKy`, thongTinDangKi)
    }

    layDanhSachLoaiNguoiDung = () => {
        return this.get(`api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }

    capNhatThongTinNguoiDung = (thongTinMoi) => {
        return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinMoi)
    }

    layDanhSachNguoiDung = (taiKhoan = '') => {
        if (taiKhoan !== '') {
            return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${taiKhoan}`);
        }
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)

    }

    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }

    themNguoiDung = (thongTinNguoiDung) => {
        return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`, thongTinNguoiDung)
    }

    layThongTinNguoiDungEdit = (taiKhoan) => {
        return this.get(`api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan}`)
    }

    updateThongTinNguoiDung = (thongTinNguoiDung) => {
        return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinNguoiDung)
    }

}


export const quanLyNguoiDungServices = new QuanLyNguoiDungServices();
