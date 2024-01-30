import express,{Request,Response} from "express";
import { setupServices } from "../services/setup.services";


export const setupController = {
    getCategory: async(req:Request , res: Response) => {
        try {
            const result = await setupServices.getCategory() 

            res.status(200).json({
                data:result,
                message:"success",
            })
        } catch (error) {
            res.status(400).json(error)
        }
    },
    getCategoryId: async(req:Request , res: Response) => {
        const {id} = req.params
        try {
            const result = await setupServices.getCategoryId(Number(id)) 

            res.status(200).json({
                data:result,
                message:"success",
            })
        } catch (error) {
            res.status(400).json(error)
        }
    },
    addCategory: async(req:Request , res: Response) => {
        const {name} = req.body
        try {
            const result = await setupServices.addCategory(name)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    getQuizz: async(req:Request , res: Response) => {
        const {number,category,lever} = req.params
        console.log(number,category,lever)
        try {
            const result = await setupServices.getQuizz(number,Number(category),Number(lever))
            res.status(200).json({
                data:result,
                message:"success",
            })
        } catch (error) {
            res.status(400).json(error)
        }
    },
    getAnswer: async(req:Request , res: Response) => {
        try {
            const result = await setupServices.getAnswer()
            res.status(200).json({
                data:result,
                message:"success",
            })
        } catch (error) {
            res.status(400).json(error)
        }
    }
}