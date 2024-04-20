'use client'
import {Col, Row, Tooltip,Tabs} from "antd";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import './index.scss'
const AppList = ({data})=>{
    const router = useRouter()
    const onDetailPage =(e)=>{
        window.open(`http://localhost:3000/detail/${e.id}`)
    }
    const renderTrueHtml = (data)=>{
        return <Row>
            {
                data.map((v,key)=>{
                    return <Col key={key} xxl={4} xl={6} lg={6} md={8} sm={12} xs={24} onClick={()=>onDetailPage(v)}>
                        <Tooltip title={v.title}>
                            <div className='app-card'>
                                <div className='app-icon'>
                                    {
                                        v.icon?<Image width={45} height={45} src={v.icon} alt={v.name}></Image>:null
                                    }
                                </div>
                                <div className='app-right'>
                                    <div className='fs16 fw500 overflow-ellipsis'>{v.name}</div>
                                    <div className='C6c757d overflow-ellipsis'>{v.title}</div>
                                </div>
                            </div>
                        </Tooltip>
                    </Col>
                })
            }
        </Row>
    }
    const renderFalseHtml = (data)=>{
        const items = data.map(v=>{
            return{
                key: v.value,
                label: v.label,
                children: renderTrueHtml(v.children)
            }
        })
        return <Tabs defaultActiveKey="1" items={items} type='card'/>
    }
    const renderHtml = (data)=>{
        const isBoolean = data.some(item => Array.isArray(item.children))
        return isBoolean?renderFalseHtml(data):renderTrueHtml(data)
    }

    return <div className='app-list'>
        {
            data.map((v,key)=>{
                return <div id={`div${key+1}`} key={key}>
                    <div className='title-label' id={v.value}>{v.label}</div>
                    {
                        renderHtml(v.children)
                    }
                </div>
            })
        }
    </div>
}
export default AppList