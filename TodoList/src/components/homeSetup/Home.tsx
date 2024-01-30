import React, { useEffect } from 'react'
import './Home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Home({getReq}:any) {
interface cate{
    id:number,
    nameCategory:string
}
type req = {
    number?:number,
    category?:number,
    level?:number
}
const navigate = useNavigate()
const [category, setCategory] = React.useState<cate[]>([])
const [request, setRequest] = React.useState<req>({})
useEffect(()=>{
    const result = axios.get('http://localhost:8080/getCategory')
    .then((res)=>{
        setCategory(res.data.data)
    }) 
        
},[])
const changeReq = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    setRequest({...request,[e.target.name]:e.target.value})
}
const getRequest = ()=>{
    getReq(request)
    navigate('/play')
}
  return (
    <>
    <div className='container'>
        <div className='table'>
            <h1>Set Up Quizz</h1>
            <label htmlFor="">Number of questions </label>
            <br />
            <select name="number" id="" onChange={changeReq} >
                <option value="0">chon so cau </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <br />
            <label htmlFor="">Category</label>
            <br />
            <select name="category" id="" onChange={changeReq}>
                <option value="">Chon muc</option>
                {   
                    category.map((cate:cate)=>{
                        return <option value={cate.id}>{cate.nameCategory}</option>
                    })
                }
            </select>
            <br />
            <label htmlFor="">Lever </label>
            <br />
            <select name="lever" id="" onChange={changeReq}>
                <option value="">Chon muc</option>
                <option value="0">Easy</option>
                <option value="1">Normal</option>
                <option value="2">Hard</option>
            </select>
            <br />
            <button onClick={getRequest}>START</button>
        </div>
    </div>
    </>
)
}
