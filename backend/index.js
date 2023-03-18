import express from 'express';
import { getRedis } from './redis.js';
import { Client } from 'redis-om';

/** @type { Client } */
let redis = await getRedis();  // Preinit Redis Client

import todoRouter from './routes/todo.js';

const app = express();
const env = process.env.NODE_ENV;

if (env == "development") {
    const debugMiddleware = (req, _, next) => {
        console.log(req.ip + " : " + req.method + " " + req.path);
        next();
    };
    app.use(debugMiddleware);
} else {
    const cors = require('cors');
    app.use(cors({
        origin: "*",
    }));
}

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
