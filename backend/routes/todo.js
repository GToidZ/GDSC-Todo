import express from 'express';
import bodyParser from 'body-parser';
import { getRedis } from '../redis.js';
import { Client, Repository } from 'redis-om';

import { todoSchema } from '../schema/todo.js';

const router = express.Router();
const jsonParser = bodyParser.json({ extended: false });

/** @type { Client } */
let redis = await getRedis();

/** @type { Repository } */
const todoRepository = await redis.fetchRepository(todoSchema);
await todoRepository.createIndex();

/*
 *  GET /
 *  Returns all todo entries
 */
router.get("/", async (_, res) => {
    const data = await todoRepository.search().returnAll();
    res.send(data);
});

/*
 *  POST /create
 *  Takes a form data (name, description) and creates a new
 *  todo entry in Redis.
 */
router.post("/create", jsonParser, async (req, res) => {
    const todoName = req.body.name;

    if (!todoName) {
        res.status(400).json({
            error: "You must specify a name for Todo."
        });
    }

    const todoDescription = req.body.description || "";
    const todoCreatedAt = new Date(Date.now()).toISOString();

    const todo = {
        name: todoName,
        description: todoDescription,
        createdAt: todoCreatedAt,
        done: false,
    };

    await todoRepository.createAndSave(todo);

    res.json(todo);
});

/*
 *  PUT /edit/:id
 *  Update todo of `id` to new object.
 *  Request body will be JSON of new Todo object (some properties might be null).
 *  Response should return JSON of updated Todo object.
 */
router.put("/edit/:id", jsonParser, async (req, res) => {
    const todoID = req.params["id"];

    if (!todoID) {
        res.status(400).json({
            error: "You must specify a ID for Todo."
        });
    }

    const todoName = req.body.name;
    const todoDescription = req.body.description;
    const todoCreatedAt = req.body.createdAt;
    const todoDone = req.body.done;

    const todo = await todoRepository.fetch(todoID);

    todo.name = todoName ? todoName : todo.body.name;
    todo.description = todoDescription ? todoDescription : todo.description;
    todo.done = todoDone ? todoDone : todo.done;

    await todoRepository.save(todo)

    res.json(todo);
});

/*
 *  DELETE /delete/:id
 *  Delete todo of `id` from database.
 *  Response should return JSON of deleted Todo object.
 */
router.delete("/delete/:id", async (req, res) => {
    const todoID = req.params["id"];

    if (!todoID) {
        res.status(400).json({
            error: "You must specify a ID for Todo."
        });
    }

    const todo = await todoRepository.fetch(todoID);
    await todoRepository.remove(todoID);
    res.json(todo);
});

export default router;
