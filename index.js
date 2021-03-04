import express from 'express'
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.js"

const app = express();
dotenv.config();

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: "OK"
    });
})

app.use("/auth",authRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server Çalışıyor: ${PORT}`)
    })
}).catch(error => {
    console.error(error.message)
})
