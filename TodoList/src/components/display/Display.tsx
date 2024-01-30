import axios from 'axios'
import React, { useEffect } from 'react'
type req = {
    number?:number,
    category?:number,
    lever?:number
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
  idQ:number
}
type ans = {
    id:number
    content:string
    isAnswer:number
    idQuestion:number
}
export default function Display(prop:pops) {
    const {reqa} = prop
    const [question, setQuestion] = React.useState<ques[]>([])
    const [answer, setAnswer] = React.useState<ans[]>([])

  useEffect(()=>{
    axios.get(`http://localhost:8080/getQuizz/${reqa.number}/${reqa.category}/${reqa.lever}`)
    .then((res)=>{
        console.log(res.data.data)
        setQuestion(res.data.data)
    })
    axios.get('http://localhost:8080/getAnswer')
    .then((res)=>{
        console.log(res.data.data)
        setAnswer(res.data.data)

    })
  },[prop.reqa])
  return (
    <>
     <div className='container'>
           <div className='table'>
                <div
                style={{display:'flex', justifyContent:'space-between'}}>
                   <h1>Play Quizz</h1>
                    <p> Câu Hỏi : 0 / {question.length}</p> 
                </div>
                
                <div>
                    {
                        question.map((ques:ques)=>{
                            return <div>
                                    <h2>{ques.content}</h2>
                                    <div style={{display:'flex', justifyContent:'space-between',padding:"10px"}}>
                                        {
                                        answer.map((ans:ans)=>{
                                            if(ans.idQuestion === ques.idQ){
                                                return <button key={ans.id} style={{backgroundColor:"blue",width:"80px"}}>{ans.content}</button>
                                            }
                                        })
                                    }
                                    </div>
                                    
                                    </div>
                        })
                    }
                </div>
            </div> 
     </div>
    </>
  )
}
