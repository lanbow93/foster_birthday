import dotenv from "dotenv";
import mongoose, { Error } from "mongoose";

dotenv.config()

const {DATABASE_URL}: any = process.env

mongoose.connect(DATABASE_URL)

mongoose.connection
    .on("open", () => {console.log("Mongo is connected")})
    .on("close", () => { console.log("Mongo is disconnected")})
    .on("error", (error: Error) => {console.log(error)})
    
export default mongoose