import React from 'react'
import Home from './components/homeSetup/Home'
import Display from './components/display/Display'
import { Route, Routes } from 'react-router-dom'

export default function App() {
  const [request, setRequest] = React.useState<req>({})
  type req = {
    number?:number,
    category?:number,
    level?:number
  }
  const getRequest = (req:req):void => {
    setRequest(req)
  }
  return (
    <>
    <Routes>
      <Route path='/' element={<Home getReq={getRequest}></Home>}></Route>
      <Route path='/play' element={<Display reqa={request}></Display>}></Route>
    </Routes>
    </>
  )
}
