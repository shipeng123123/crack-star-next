import {Input} from 'antd'
import './Search.scss'
const Search = ()=>{
    const onSearch = (e)=>{
        console.log(e)
    }
    return <div className='search'>
        <input className='ant-input' placeholder='站内搜索'/>
        <button className='ant-btn'>搜索</button>
    </div>
}
export default Search