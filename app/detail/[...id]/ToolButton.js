'use client'
import {RightOutlined} from "@ant-design/icons";
import './index.scss'
const ToolButton = (props)=>{
    return <a href={props.href} target={'_blank'}>
        <div className='tool-button'>打开工具官网<RightOutlined className='ml10'/></div>
    </a>
}
export default ToolButton