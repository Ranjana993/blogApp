import express from 'express';
import { Connection } from './db/data.js';
import dotenv from "dotenv";
import Router from './routes/route.js';
import cors from "cors"
import bodyParser from "body-parser"



const app = express()
app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config()
app.use('/', Router)

const PORT = process.env.PORT || 8000;
Connection()

app.listen(PORT, () => console.log(`server is Running on http://localhost:${PORT}`))