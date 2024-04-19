import './index.scss'
const TextContent = (props)=>{
    const {text} = props
    return <div className='cus-text-content'>
        {
            text?<div dangerouslySetInnerHTML={{__html:text}}/>:null
        }
    </div>
}
export default TextContent