import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.ORIGIN_NAME,    
    credentials: true
}))
app.use(express.json({limit: "1mb"}))
app.use(cookieParser())
app.use(urlencoded({extended: true, limit: "1mb"}))
app.use('/public', express.static('public'));
//router

import CategoryRoute from "./routes/cetagory.route.js"
import shayariRoute from "./routes/shayari.route.js"
import photoCategoryRoute from "./routes/photoCategory.route.js"
import photoShayariRoute from "./routes/photoShayari.route.js"


app.use("/api/v1/category", CategoryRoute)
app.use("/api/v1/shayari", shayariRoute)
app.use("/api/v1/photoCategory", photoCategoryRoute)
app.use("/api/v1/photoShayari", photoShayariRoute)
export { app }