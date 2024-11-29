import dotenv from 'dotenv/config.js'
import express from 'express'
import path from 'path'
import userRouter from './Routes/user.routes.js'
import connectToDb from './config/db.js'
import cookieParser from 'cookie-parser'
import indexRouter from './Routes/index.routes.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()
connectToDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));

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