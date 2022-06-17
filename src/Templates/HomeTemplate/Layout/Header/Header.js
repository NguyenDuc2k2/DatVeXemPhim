import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Dropdown, Menu, Space } from 'antd';
import { TOKEN, USER_LOGIN } from '../../../../Util/Settings/Config';


export default function Header(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <>
                            <button className='mr-5' onClick={() => {
                                props.history.push('/profile')
                            }}>
                                Thông Tin Cá Nhân
                            </button>
                            <hr className='mt-3' />
                        </>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <button className='mr-10 text-red-700' onClick={() => {
                            localStorage.removeItem(USER_LOGIN);
                            localStorage.removeItem(TOKEN);
                            window.location.reload();
                        }
                        }>Đăng Xuất</button>
                    ),
                },
            ]}
        />
    );

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <NavLink to='/register' className="self-center px-8 py-3 font-semibold rounded dark:bg-blue-600 dark:text-white mr-10 ">Đăng Kí</NavLink>
                <NavLink to='/login' className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900 mr-10">Đăng Nhập</NavLink>
            </Fragment>
        }
        return <Fragment>
            <Dropdown overlay={menu} className='mr-10'>
                <Space style={{ cursor: 'default' }}>
                    Hello ! <span className='text-gray-400'>{userLogin.hoTen}</span>
                </Space>
            </Dropdown>
        </Fragment>
    }
    return (
        <header className="p-4 bg-black text-gray-100 bg-opacity-80 fixed w-full z-10 opacity-90">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png' alt='' />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to='/' activeClassName='border-b-2 border-w-100' rel="noopener noreferrer" className="flex items-center px-4 mb-1 dark:text-white dark:border-violet-400">Trang Chủ</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </header>
    )
}
