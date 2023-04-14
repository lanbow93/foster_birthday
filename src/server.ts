import { Application, Request, Response } from "express"
import cookieParser from "cookie-parser"
import authRouter from "./controllers/auth"
import photoRouter from "./controllers/photo"



const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

require("dotenv").config()

//Application 
const app: Application = express()

//Middleware

app.use(morgan("tiny"));
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))


// Routes
app.use("/auth", authRouter)
app.use("/photo", photoRouter)


app.get('/', (request: Request, response: Response) => {
    response.send("Server is functional")
})

const {PORT} = process.env


app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`)
})