import React, { useState } from "react";
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';

const { SubMenu, Item } = Menu;

export default function Header() {
    const [current, setCurrent] = useState("home")
    const handleClick = (e) => {
        setCurrent(e.key);
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
            <Item key="home" icon={<AppstoreOutlined />} >
                Home
            </Item>
            <SubMenu icon={<SettingOutlined />} title="Username" >
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
            </SubMenu>

            <Item key="register" icon={<UserAddOutlined />} style={{marginLeft: "auto"}}>
                Register
            </Item>

            <Item key="login" icon={<UserOutlined />} >
                Login
            </Item>


            
        </Menu>
    )
}
