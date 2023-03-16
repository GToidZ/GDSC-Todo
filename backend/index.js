import express from 'express';
import { getRedis } from './redis.js';
import todoRouter from './routes/todo.js';
import { Client } from 'redis-om';

const app = express();

/** @type { Client } */
let redis = await getRedis();
console.log(redis);

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

process.on('SIGTERM', async () => {
    if (redis) {
        redis.quit();
    }
});