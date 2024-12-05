import express from "express";
import cors from "cors";
import videoRouter from "./routes/video.routes.js";
import courseRouter from "./routes/course.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import trendingRouter from "./routes/trending.routes.js";
const app = express();


app.use(cors({
    origin: "*",
}));
app.use(express.json({
    limit: "100mb"
}));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.send("Hello World from Spaces!");
});

app.use("/api/v1/video",videoRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/user", userRouter);
app.use('/api/v1/post',postRouter);
app.use("/api/v1/trending", trendingRouter);

export default app