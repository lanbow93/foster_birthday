import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"
require("dotenv").config()

const {SECRET}: any = process.env
async function adminLoggedIn  (request: any, response: Response, next: NextFunction){
    try {
        // Check if token is in the cookies
        const { token = false} = request.cookies;
        if (token) {
            // Verify token
            const payload: any = await jwt.verify(token, SECRET);
            // Add payload to request
            request.payload = payload;
            next()
        } else {
            throw "Not logged In"
        }
    } catch (error) {
        response.status(400).json({error})
    }
}

export default adminLoggedIn