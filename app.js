import dotenv from 'dotenv/config.js'
import express from 'express'
import userRouter from './Routes/user.routes.js'
import connectToDb from './config/db.js'
import cookieParser from 'cookie-parser'
import indexRouter from './Routes/index.routes.js'

const app = express()
connectToDb();

app.set("view engine", "ejs")

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", indexRouter)
app.use("/user", userRouter)

process.on('uncaughtException', (err) => {
    console.log('uncaught exception');
    console.log(err)
})
app.listen(3000)