/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu';
import { useSelector, useDispatch } from 'react-redux';
import ListFilm from '../../Components/RSclick/ListFilm';
import { layDanhSachPhimAction } from '../../Redux/Action/QuanLyPhimAction'
import { layDanhSachHeThongRapAction } from '../../Redux/Action/QuanLyRapAction';
import HomeCarousel from '../../Templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'

export default function Home(props) {

  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
  
  const { heThongRap } = useSelector(state => state.QuanLyRapReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachHeThongRapAction());

  }, [])

  return (
    <div>
      <HomeCarousel />
      <div className='container'>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              <ListFilm arrFilm={arrFilm} />
            </div>
          </div>
        </section>
        <HomeMenu heThongRap={heThongRap} />
      </div>
    </div>
  )
}
