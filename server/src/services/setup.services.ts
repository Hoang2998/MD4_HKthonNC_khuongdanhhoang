import { pool } from "../config/database"

export const setupServices = {
    getCategory: async() => {
        const [result] = await pool.execute("SELECT * FROM category")
        // console.log(result)
        return result
    },
    getCategoryId: async(id:number) => {
        const [result] = await pool.execute("SELECT * FROM category WHERE id = ?",[id])  
        return result
    },
    addCategory: async(name:string) => {
        const result = await pool.execute("INSERT INTO category (name) VALUES (?)",[name]) 
        return result 
    },
    getQuizz: async(numbera:string,category:number,lever:number) => {
        console.log(numbera,category,lever)
        const [result] = await pool.execute("SELECT * FROM question JOIN category ON question.category = category.id WHERE question.category = ? AND question.lever = ?  LIMIT ?;",[category,lever,numbera] )
        console.log("111111111",result)
        return result
    },
    getAnswer: async() => {
        const [result] = await pool.execute("SELECT * FROM answer")
        return result
    }
}