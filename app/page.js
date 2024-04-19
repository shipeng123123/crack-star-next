import StarrySky from "../component/Layout/StarrySky/StarrySky";
import Search from "../component/Layout/Search/Search";
import AppList from "../component/AppList";
import {TypeData} from "../utils/typeData";
import {url} from "../utils/url";
import './home.scss'
export default async function Home() {
    let appList = []
    try {
        const response = await fetch(url + '/api/instrument/list?pageNum=1&pageSize=2000')
        const res = await response.json()
        if (res&&res.code===0){
            const data = res?.data?.rows || []
            const getRecursivelyData = (typeArr, appArr, isTopLevel = true) => {
                const arr = [];
                for (let i = 0; i < typeArr.length; i++) {
                    const item = typeArr[i];
                    const filterKey = isTopLevel ? 'type' : 'twoType';
                    const newArr = appArr.filter(v => v[filterKey] === item.value);
                    const children = item.children ? getRecursivelyData(item.children, newArr, false) : newArr;
                    arr.push({
                        label: item.label,
                        value: item.value,
                        children: children
                    });
                }
                return arr;
            };
            appList = getRecursivelyData(TypeData,data)
        }

    }catch (e){

    }
    return <div className='home'>
        <div className='cus-canvas-back'>
            <StarrySky/>
            <div className='canvas-content vlcb'>
                <div className="demo-logo-vertical dfc mt15">
                    <div className='demo-logo' style={{width:50,height:50}}/>
                    <h1 className='ml15' style={{fontSize:36}}>破局者星球</h1>
                </div>
                <div className='canvas-search mt30'>
                    <Search/>
                </div>
            </div>
        </div>
        <div className='app-vessel' id="content">
            <AppList data={appList}/>
        </div>
    </div>
}