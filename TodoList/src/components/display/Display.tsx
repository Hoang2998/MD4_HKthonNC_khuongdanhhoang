import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Display.css'
type req = {
    number?: number,
    category?: number,
    lever?: number
}
type pops = {
    reqa: req
}

type ques = {
    content: string
    id: number
    lever: number
    category: number
    nameCategory: string
    idQ: number
}
type ans = {
    id: number
    content: string
    isAnswer: number
    idQuestion: number
}
export default function Display(prop: pops) {
    const { reqa } = prop
    const [question, setQuestion] = React.useState<ques[]>([])
    const [answer, setAnswer] = React.useState<ans[]>([])
    const [current, setCurrent] = React.useState<number>(0)
    const [count, setCount] = React.useState<number>(0)
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:8080/getQuizz/${reqa.number}/${reqa.category}/${reqa.lever}`)
            .then((res) => {
                console.log(res.data.data)
                setQuestion(res.data.data)
            })
        axios.get('http://localhost:8080/getAnswer')
            .then((res) => {
                console.log(res.data.data)
                setAnswer(res.data.data)

            })
    }, [prop.reqa])
    const nextQuestion = (isAnswer: number) => {
        if (isAnswer === 1) {
            setCount(count + 1)
        }
        if(current > question.length){
                setCurrent(question.length)
                return
            }

            setCurrent(current + 1)
            
    }
    const reStart = ()=>{
        setCurrent(0)
        setCount(0)
    }
    return (
        <>
            <div className='container'>
                <div className='table'>
                    <div
                        style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h1>Play Quizz</h1>
                        <p> Câu Hỏi : {current} / {question.length}</p>
                    </div>
                    <div>
                        <h2>{question[current]?.content}</h2>
                        <div style={{ display: 'flex', flexDirection: "column", gap: "10px", padding: "10px",width:"100%"}}>
                            {
                                answer.map((ans: ans) => {
                                    if (ans.idQuestion === question[current]?.idQ) {
                                        return <button onClick={()=>nextQuestion(ans.isAnswer)}key={ans.id} style={{  width: "100%" }} className='btn'>{ans.content}</button>
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div style={{ width: "40%", display: "flex", flexDirection: "column",gap: "10px", justifyContent: "center", alignItems: "center" , padding: "10px",height:"200px",position:"absolute"
                    ,top:"50%",left:"50%",transform:"translate(-50%,-50%)",backgroundColor:"white",borderRadius:"10px",fontSize:"30px",visibility:current == question.length?"visible":"hidden"}}>
                        <p>Bạn đã đúng {count} câu hỏi</p>
                        <button style={{  width: "200px" }} onClick={() => navigate('/')}> Home </button>
                        <button style={{  width: "200px" }} onClick={reStart}> Agian </button>
                    </div>
                </div>
            </div>
        </>
    )
}
