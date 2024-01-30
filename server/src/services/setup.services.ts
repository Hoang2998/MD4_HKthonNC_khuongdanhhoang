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
    getQuizz: async(number:number,category:number,lever:number) => {
        console.log(number,category,lever)
        const [result] = await pool.execute("SELECT * FROM question JOIN category ON question.category = category.id WHERE category = ? AND lever = ? ",[category,lever] )
        console.log(result)
        return result
    },
    getAnswer: async() => {
        const [result] = await pool.execute("SELECT * FROM answer")
        return result
    }
}