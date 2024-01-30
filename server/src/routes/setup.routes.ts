import express  from "express";
import { setupController } from "../controller/setup.controller";
const setupRoutes = express.Router();
 
setupRoutes.get('/getCategory',setupController.getCategory) 
setupRoutes.get('/getCategory/:id',setupController.getCategoryId) 
setupRoutes.post('/addCategory',setupController.addCategory)
setupRoutes.get('/getQuizz/:number/:category/:lever',setupController.getQuizz) 
setupRoutes.get('/getAnswer',setupController.getAnswer)

export default setupRoutes