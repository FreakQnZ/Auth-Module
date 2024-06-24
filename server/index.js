import express from "express"
import cors from "cors"
import AuthRoutes from "./routes/auth.js"
import mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config()

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI, {
    dbName: "bigProject"
})

app.use(cors())
app.use(express.json())

app.use("/auth", AuthRoutes)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})


