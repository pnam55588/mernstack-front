import React, { useState } from "react";
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import {signOut} from 'firebase/auth'
import { useDispatch, useSelector } from "react-redux";
import {auth} from '../../firebase'
import {useHistory} from 'react-router-dom'

const { SubMenu, Item } = Menu;

export default function Header() {
    const [current, setCurrent] = useState("home")
    let history = useHistory()
    let {user} = useSelector((state)=> ({...state}))
    let dispatch = useDispatch()
    const handleClick = (e) => {
        setCurrent(e.key);
    }
    const logout = () =>{
        signOut(auth)
        dispatch({
            type: "LOGOUT",
            payload: null
        })
        history.push("/login")
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" >
            <Item key="home" icon={<AppstoreOutlined />} >
                <Link to="/">Home</Link>
            </Item>

            {user &&
            (<SubMenu icon={<SettingOutlined />} 
                title= {user.email && user.email.split("@")[0]}
                style={{ marginLeft: "auto" }}
            >
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
                <Item icon={<LogoutOutlined />} 
                    onClick={logout}
                >
                    Logout
                </Item>
            </SubMenu>)
            }

            {!user && 
            (<Item key="login" icon={<UserOutlined />} style={{ marginLeft: "auto" }} >
                <Link to="/login">Login</Link>
            </Item>)
            }

            {!user && 
            (<Item key="register" icon={<UserAddOutlined />} >
                <Link to="/register">Register</Link>
            </Item>)
            }




        </Menu>
    )
}
