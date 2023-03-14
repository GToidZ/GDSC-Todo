import express from 'express';
import todoRouter from './routes/todo.js';

const app = express();

app.all("/", (_, res) => {
    res.send("Welcome to GDSC!");
});

/*
 *  GET /todo
 *  Pass on to Todo router
 */
app.use("/todo", todoRouter);

app.listen(8080, () => {
    console.log("Server started at port 8080");
});
