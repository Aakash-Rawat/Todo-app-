import express from "express";
import dotenv from"dotenv";
import connectdb from "./db/db.js";
import authRoute from './routes/auth.js'
import todoRoute from './controller/todo.js'
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.use('/api/v1/user',authRoute);
app.use('/api/v1',todoRoute);


const startServer = async () => {
    try {
        await connectdb();

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    } catch (error) {
        console.log("Database connection failed:", error);
    }
};

startServer();


