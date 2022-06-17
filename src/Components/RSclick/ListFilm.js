import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU,SET_TAT_CA_PHIM } from "../../Redux/Action/Type/QuanLyPhimType";
import FilmCard from "../Film/FilmCard";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "blue" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

export default function ListFilm(props) {

    const dispatch = useDispatch();

    const { arrFilm } = props;

    const { dangChieu, sapChieu,tatCaPhim } = useSelector(state => state.QuanLyPhimReducer);

    let activeClassSC = sapChieu === true ? 'none_active_film' : 'active_fllm';
    let activeClassDC = dangChieu === true ? 'none_active_film' : 'active_fllm';
    let activeClassTC = tatCaPhim === true ? 'none_active_film' : 'active_fllm';


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        rows: 2,
        centerPadding: 50,
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay:true,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const renderArrFilm = () => {
        return arrFilm.map((film, index) => {
            return <div key={index} className='pt-6'>
                <FilmCard item={film} />
            </div>
        })
    }
    return (
        <div className="w-full">
            <button className={`${activeClassTC} px-8 py-3 font-semibold rounded `} onClick={() => {
                const action = {
                    type: SET_TAT_CA_PHIM
                }
                dispatch(action)
            }}>Tất Cả Phim</button>
            <button className={`${activeClassDC}  px-8 py-3 font-semibold rounded `} onClick={() => {
                const action = {
                    type: SET_PHIM_DANG_CHIEU
                }
                dispatch(action)
            }}>Phim Đang Chiếu</button>
            <button className={`${activeClassSC} px-8 py-3 font-semibold rounded `} onClick={() => {
                const action = {
                    type: SET_PHIM_SAP_CHIEU
                }
                dispatch(action)
            }}>Phim Sắp Chiếu</button>
            <hr className="mt-3 bg-black" style={{height:2}} />
            <Slider  {...settings}>
                {renderArrFilm()}
            </Slider>
        </div>
    );

}