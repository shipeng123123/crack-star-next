import {url as baseUrl} from "./url";
import {message} from "antd";
function objectToQueryString(params) {
    const keys = Object.keys(params);
    const encodedParams = keys.map(key => {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(params[key]);
        return `${encodedKey}=${encodedValue}`;
    });
    return encodedParams.join('&');
}
function appendQueryParamsToUrl(url, params) {
    if (!params)return  url
    const queryString = objectToQueryString(params);
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${queryString}`;
}
const request = async (option)=>{
    try {
        const {method,params} = option
        let url = ''
        let other = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
        }
        if(method==='get'){
            url = appendQueryParamsToUrl(option.url, params);
        }else {
            url = option.url
            other.body = JSON.stringify(params)
        }
        const response = await fetch(baseUrl+url,other);
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.startsWith('image')) {
            // 如果是图片类型，直接返回响应
            return response;
        }
        const data = await response.json()
        if (data&&data.code===0){
            return data
        }
        if (data&&data.code===401){
            localStorage.removeItem('token')
            return data
        }
        message.error(data.message)
        return null
    }catch (e){
        console.log(e)
    }
}
export default request