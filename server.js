import express from "express"
import connectDB from "./config/db.js";
import dotenv from "dotenv"
import morgan from "morgan";
import colors from 'colors'
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js"
import productRoutes from "./routes/productRoute.js"
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url";

const app = express()

//Dotenv configuration
dotenv.config();

//DB connection
connectDB();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/dist')))

//Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)


//APIS
app.use('*',function(req,res){
	res.sendFile(path.join(__dirname,'./client/dist/index.html'))
})


app.listen(process.env.PORT, ()=>{
	console.log(`Server running on ${process.env.PORT}`.bgCyan.white)
})


