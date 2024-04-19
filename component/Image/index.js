'use client'
import Image from "next/image";
const CusImage = (props)=>{
    return     <Image width={275} height={154} src={props.url} alt={props.title}></Image>
}
export default CusImage