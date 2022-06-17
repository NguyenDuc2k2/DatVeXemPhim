import React, { useState } from 'react';
import { FileOutlined, UserOutlined, } from '@ant-design/icons';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Dropdown, Space } from 'antd';
import { useSelector } from 'react-redux';
import { TOKEN, USER_LOGIN } from '../../Util/Settings/Config';

const { Footer, Sider } = Layout;

function getItem(label, key, icon, children, type) {
    return { key, icon, children, label, type, };
};

const items = [
    getItem(<NavLink to="/admin/users"> Users</NavLink>, 'sub1', <UserOutlined />, [
        getItem(<NavLink to="/admin/users"> Users</NavLink>, '11', <UserOutlined />),
        getItem(<NavLink to="/admin/users/addnew"> Add New</NavLink>, '12', <UserOutlined />)
    ]),

    getItem(<>Flims</>, 'sub2', <FileOutlined />, [
        getItem(<NavLink to='/admin/films'>Films</NavLink>, '9', <FileOutlined />),
        getItem(<NavLink to="/admin/films/addnew">Add new</NavLink>, '10', <FileOutlined />),
    ]),
];

export default function AdminTemplates(props) {

    const [current, setCurrent] = useState('1');

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const { Component, ...resProps } = props;

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <>
                            <NavLink to={'/profile'} className='mr-5' onClick={() => {
                            }}>
                                Thông Tin Cá Nhân
                            </NavLink>
                            <hr className='mt-3' />
                        </>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <>
                            <button className='mr-10 text-blue-700' onClick={() => {
                                props.history.push('/')
                            }
                            }> Trang Chủ</button>
                            <hr className='mt-3' />
                        </>
                    ),

                },
                {
                    key: '3',
                    label: (
                        <button className='mr-10 text-red-700' onClick={() => {
                            props.history.push('/')
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

    return (
        <Route {...resProps} render={(propsRoute) => {
            return (
                <Layout className='h-auto' style={{ minHeight: '100vh' }}>
                    <Sider breakpoint="lg" collapsedWidth="0" >
                        <NavLink to='/home' className={'px-5'}> <img src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png' className='mt-5' alt='' /></NavLink>
                        <Menu theme='dark' onClick={onClick} defaultOpenKeys={['sub1']} selectedKeys={[current]} mode="inline" items={items} />
                    </Sider>
                    <Layout>
                        <div className='container text-right py-5 bg-white flex items-center ' >
                            <Dropdown overlay={menu} className='mr-10'>
                                <Space style={{ cursor: 'default' }}>
                                    Hello ! <span className='text-gray-400'>{userLogin.hoTen}</span>
                                </Space>
                            </Dropdown>
                        </div>
                        <Footer className='h-auto w-full' style={{ padding: 20 }}>
                            <div className='bg-white h-full min-h-screen' style={{ padding: 20 }}>
                                <Component  {...propsRoute} />
                            </div>
                        </Footer>
                    </Layout>
                </Layout>
            )
        }}></Route>
    );
}