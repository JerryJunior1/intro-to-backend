import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

//routes import
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);


// example route: http://localhost:4000/api/v1/users/register


export { app };