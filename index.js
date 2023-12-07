import  express from "express";
import cors from "cors"
import route from "./Route.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    credentials:true,
    origin:process.env.frontend
}))

app.use('/',route)


mongoose.connect(process.env.mongo).then(()=>
    console.log('mongodb connected')
).catch((error)=>
    console.log('error mongodb connected'+error)
)

app.listen(process.env.port,()=>{
    console.log('app listen in port ' + process.env.port)
})