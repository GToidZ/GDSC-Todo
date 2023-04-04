import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { getRedis } from './redis.js';
import { Client } from 'redis-om';

/** @type { Client } */
let redis = await getRedis();  // Preinit Redis Client

import todoRouter from './routes/todo.js';

const app = express();
const env = process.env.NODE_ENV || "development";
const jsonParser = express.json();
const urlEncodedParser = express.urlencoded({ extended: true });

app.use(cors({
    origin: "*",
}));
app.use(jsonParser);
app.use(urlEncodedParser);

if (env == "development") {
    const debugMiddleware = (req, _, next) => {
        if (req.method != "GET") {
            console.log(req.ip + " : " + req.method + " " + req.path);
            console.log("headers:")
            console.log(req.headers)
            console.log("body:")
            console.log(req.body)
        }
        next();
    };
    app.use(debugMiddleware);
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
