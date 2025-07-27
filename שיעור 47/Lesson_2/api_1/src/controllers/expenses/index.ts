import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import jwtProtected from "../../middleware/jwtProtected"
dotenv.config()
const router = express.Router()

router.get("/",jwtProtected, (req, res, next) => {
    res.json({ message: "i am protected!!!" })
})


export default router;