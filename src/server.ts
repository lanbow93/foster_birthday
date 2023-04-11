import { Application, Request, Response } from "express"

const express = require("express")

require("dotenv").config()


const app: Application = express()


// Routes

app.get('/', (request: Request, response: Response) => {
    response.send("Server is running")
})

const {PORT} = process.env


app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`)
})