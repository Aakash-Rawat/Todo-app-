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


app.use('/api/v1/user',authRoute);
app.use('/api/v1',todoRoute);


const PORT = 3000;

const startServer = async () => {
    try {
        await connectdb();

        app.listen(PORT, () => {
            console.log("server started successfully");
        });

    } catch (error) {
        console.log("Database connection failed:", error);
    }
};

startServer();

startServer();


