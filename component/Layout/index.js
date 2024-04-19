'use client'
import React, {useEffect, useRef, useState} from 'react';
import { useRouter ,usePathname} from 'next/navigation'
import connectWebSocket from '../../utils/WebSocket'
import LoginModal from "./LoginModal";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button,Popover} from 'antd';
import {TypeData} from '../../utils/typeData'
import './Layout.scss'
import http from "../../utils/http";
const {Sider, Content } = Layout;
let lastScrollPosition = 0;
const App = (props) => {
    const {element} = props
    const CHILD_LOGIN_REF = useRef()
    const router = useRouter()
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false);
    const [key,setKey] = useState('')
    const [keyPath,setKeyPath] = useState('')
    const [userData,setUserData] = useState({})
    useEffect(()=>{
    },[key,keyPath])
    useEffect(()=>{
        getUserData()
    },[])
    const onLeftNavData = (data)=>{
        return data.map(v=>{
            return{
                key:v.value,
                icon:null,
                label:v.label
            }
        })
    }
    const navTop = [
        {
            id:'1',
            label:'外国人工智能'
        },
        {
            id:'2',
            label: 'GPT新手学习区'
        },
        {
            id:'3',
            label:'互联网项目拆解教学'
        },
    ]
    const onClickMenu = async ({key})=>{
        if (pathname.includes('detail')){
           await router.push(`/`)
            setTimeout(()=>{
                document.getElementById(`div${key}`)?.scrollIntoView({ behavior: 'smooth'});
            },500)
        }else {
            document.getElementById(`div${key}`)?.scrollIntoView({ behavior: 'smooth'});
        }
    }
    const onLoginModal = ()=>{
        CHILD_LOGIN_REF.current.showModal()
    }
    const getUserData = ()=>{
        // const user = JSON.parse(localStorage.getItem('user'))
        // console.log(user)
        http({url:'/api/auth/login/token',method:'post'}).then(res=>{
            if (res&&res.code===0){
                localStorage.setItem('user',JSON.stringify(res.data))
                setUserData(res.data)
            }else {
                setUserData({})
            }
        })
    }
    return (
        <Layout className='Layout'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                {
                    collapsed?<div className="demo-logo-collapsed vlc">
                        <div className='demo-logo'/>
                    </div>:<div className="demo-logo-vertical vlb">
                        <div className='demo-logo'/>
                        <div className='demo-title'>破局者星球</div>
                    </div>
                }
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={onClickMenu}
                    defaultSelectedKeys={['1']}
                    items={onLeftNavData(TypeData)}
                />
            </Sider>
            <Layout>
                <Content className='container'>
                    <header className='header'>
                        <div className='header-nav dfv fs18'>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                className='collapsed-button'
                            />
                            {
                                navTop.map((v,key)=>{
                                    return <div className={key!==0?'ml20':''} key={v.id}>{v.label}</div>
                                })
                            }
                            {
                                userData.id?<div className='login'>
                                    <img className='head-portrait' src={userData.headPortrait} alt="登录"/>
                                </div>:<div className='login' onClick={()=>onLoginModal()}>登录</div>
                            }
                        </div>
                    </header>
                    <div className='content'>
                        {element}
                    </div>
                </Content>
            </Layout>
            <LoginModal onRef={CHILD_LOGIN_REF} getUserData={getUserData}/>
        </Layout>
    );
};
export default App;