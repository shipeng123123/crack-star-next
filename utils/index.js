const extractParams = (url)=>{
    let params = {};
    if (url) {
        let pairs = url.split('&');
        pairs.forEach(pair => {
            let keyValue = pair.split('=');
            let key = decodeURIComponent(keyValue[0]);
            params[key] = decodeURIComponent(keyValue[1]);
        });
    }
    return params;
}
export {
    extractParams
}