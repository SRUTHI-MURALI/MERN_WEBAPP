import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './connections/connection.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()
const PORT= process.env.PORT || 3000
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app= express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users', userRoutes)
app.use('/api/admin',adminRoutes)
app.use(notFound)
app.use(errorHandler)
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('server is ready')     
})


app.listen(PORT)