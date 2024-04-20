import {url} from "../../../utils/url";
import {TypeData} from "../../../utils/typeData";
import TextContent from "../../../component/TextContent";
import ToolButton from './ToolButton'
import Image from "next/image";
import {Row,Col} from 'antd'
import CusImage from "../../../component/Image";
import './index.scss'
const getData = (id)=>{
    return new Promise(async (resolve, reject)=>{
        let data = []
        try {
            const response = await fetch(url + `/api/instrument/details?id=${id}`)
            data = await response.json()
            resolve(data)
        }catch (e){
            reject()
        }
    })
}
export async function generateMetadata(props){
    let data = {}
    const id = props.params.id[0]
    const res = await  getData(id)
    if (res&&res.code===0){
        data = res.data[0] || {}
    }
    const title = `破局者星球 | ${data.name} | ${data.title}|AI工具箱｜AI教程|AI集合｜OpenAI｜AI免费教程｜AI工具软件｜副业教程｜素材集合`
    return {
        title:title ,
        description: title,
    };
}
const  DetailPage =async (props)=>{
    let data = {},tag = ''
    const id = props.params.id[0]
    const res = await  getData(id)
    if (res&&res.code===0){
        data = res.data[0] || {}
        tag = TypeData.find(v=>v.value===data.type)?.label || ''
    }
    return <div className='detail-page pd20'>
        <div className='detail-card'>
            <div className='df'>
                <div className='detail-img dfc'>
                    {/*<CusImage url={data.showUrl} alt={data.title}/>*/}
                    {/*<img src={data.showUrl} style={{width:275,height:154}}/>*/}
                    <Image width={275} height={154} src={data.showUrl} alt={data.title}></Image>
                </div>
                <div className='introduce'>
                    <div className='tag'>{tag}</div>
                    <h1>{data.name}</h1>
                    <div className='pdsx12'>{data.title}</div>
                    <div className='pdsx12'>标签：{tag}</div>
                    <ToolButton href={data.url}/>
                </div>
            </div>
            <div className='mt30'>
                <TextContent text={data.text}/>
            </div>
        </div>
    </div>
}
export default DetailPage