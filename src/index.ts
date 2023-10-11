import express from "express"
import indexRoutes from "./routes/index.routes.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from 'cors'

dotenv.config()

const app = express()
const mongoURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@coffeeshop.ugpe9mi.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
mongoose.connect(mongoURL)

// Config cors
app.use(cors({
  origin: ["http://localhost:4200", "https://coffee-shop-fpoly.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use("/api", indexRoutes)
app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "App is working"
  })
})

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT)
})