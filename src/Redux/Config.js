import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { CarouselReducer } from './Reducer/CarouselReducer';
import { QuanLyPhimReducer } from './Reducer/QuanLyPhimReducer';
import { QuanLyRapReducer } from './Reducer/QuanLyRapCeducer';
import { QuanLyNguoiDungReducer } from './Reducer/QuanLyNguoiDungReducer';
import { QuanLyDatVeReducer } from './Reducer/QuanLyDatVeReducer';
import { LoaddingReducer } from './Reducer/LoaddingReducer';

const rootReducer = combineReducers({
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,
    LoaddingReducer

})


export const store = createStore(rootReducer,applyMiddleware(thunk));

