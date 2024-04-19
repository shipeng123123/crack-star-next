import {useEffect, useImperativeHandle, useState} from "react";
import { Modal, Button} from "antd";
import {webSocketURL} from "../../utils/url";
import http from '../../utils/http'
import './Layout.scss'
let ws = null
const LoginModal = (props)=>{
    const [open, setOpen] = useState(false);
    const [title,setTitle] = useState('登录')
    const [img,setImg] = useState('')
    useImperativeHandle(props.onRef,()=>{
            return{
                showModal
            }
    })
    useEffect(()=>{
        if (!open)return
        if (typeof WebSocket != 'undefined') {
            ws = new WebSocket(webSocketURL,'conn' );
            ws.addEventListener('open', () => {
                console.log('[webSocket] 连接成功.');
                // 连接成功后发送消息
                ws.send('客户端连接成功');
            });
            ws.addEventListener('message', ({ data }) => {
                const res = JSON.parse(data);
                localStorage.setItem('token',res.data.token)
                props.getUserData()
            });
            ws.addEventListener('close', () => {
                console.info('[webSocket] 关闭.');
            });
        } else {
            alert("您的浏览器不支持Websocket通信协议，请使用Chrome或者Firefox浏览器！")
        }
        return()=>{
            ws?.close()
        }
    },[open])
    const showModal = ()=>{
        http({url:'/api/ticket/img',method:'get'}).then(res=>{
            if (res.ok) {
                res.blob().then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    setImg(imageUrl);
                });
            } else {
                console.error('Failed to fetch image');
            }
        })
        setOpen(true)
    }
    const onReset = ()=>{
        ws?.close()
        setOpen(false)
    }
    const hideModal = ()=>{

    }
    return <Modal
        title={title}
        open={open}
        onOk={hideModal}
        onCancel={onReset}
        footer={<Button onClick={onReset}>返回</Button>}
        okText="确认"
        cancelText="返回"
    >
        <div className='login-img'>
            <img src={img} style={{width:300,height:300}}/>
            <div className='vlc fs18'>微信扫码登录</div>
        </div>
        {/*<Form>*/}
        {/*    <Form.Item*/}
        {/*        label="账号"*/}
        {/*        name="密码"*/}
        {/*        rules={[*/}
        {/*            {*/}
        {/*                required: true,*/}
        {/*                message: '请输入账号',*/}
        {/*            },*/}
        {/*        ]}*/}
        {/*    >*/}
        {/*        <Input />*/}
        {/*    </Form.Item>*/}

        {/*    <Form.Item*/}
        {/*        label="密码"*/}
        {/*        name="密码"*/}
        {/*        rules={[*/}
        {/*            {*/}
        {/*                required: true,*/}
        {/*                message: '请输入密码',*/}
        {/*            },*/}
        {/*        ]}*/}
        {/*    >*/}
        {/*        <Input.Password />*/}
        {/*    </Form.Item>*/}
        {/*    <Form.Item*/}
        {/*        wrapperCol={{*/}
        {/*            offset: 3,*/}
        {/*            span: 16,*/}
        {/*        }}*/}
        {/*        name="remember"*/}
        {/*        valuePropName="checked"*/}
        {/*    >*/}
        {/*        <Checkbox>记住密码</Checkbox>*/}
        {/*    </Form.Item>*/}
        {/*</Form>*/}

    </Modal>
}
export default LoginModal
