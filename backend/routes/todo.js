import express from 'express';
import { getRedis } from '../redis.js';
import { Client, Repository } from 'redis-om';

import { todoSchema } from '../schema/todo.js';

const router = express.Router();
const jsonParser = express.json({ extended: false });

/** @type { Client } */
let redis = await getRedis();

/** @type { Repository } */
const todoRepository = redis.fetchRepository(todoSchema);
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

    const todoObject = {
        name: todoName,
        description: todoDescription,
        createdAt: todoCreatedAt,
        done: false,
    };

    const todo = await todoRepository.createAndSave(todoObject);

    res.json(todo);
});

/*
 *  PUT /edit/:id
 *  Update todo of `id` to new object.
 *  Request body will be JSON of new Todo object (some properties might be null).
 *  Response should return JSON of updated Todo object.
 */
router.put("/edit/:id", jsonParser, async (req, res) => {
    const todoID = req.params.id;

    if (!todoID) {
        res.status(400).json({
            error: "You must specify a ID for Todo."
        });
    }

    const todo = await todoRepository.fetch(todoID);

    if (todo.createdAt === null) {
        res.status(404).json({
            error: "Todo with specified ID not found."
        });
    }

    todo.name = req.body.name ? req.body.name : todo.name;
    todo.description = req.body.description ? req.body.description : todo.description;
    todo.done = req.body.done ? req.body.done : todo.done;

    await todoRepository.save(todo)

    res.json(todo);
});

/*
 *  DELETE /delete/:id
 *  Delete todo of `id` from database.
 *  Response should return JSON of deleted Todo object.
 */
router.delete("/delete/:id", async (req, res) => {
    const todoID = req.params.id;

    if (!todoID) {
        res.status(400).json({
            error: "You must specify a ID for Todo."
        });
    }

    const todo = await todoRepository.fetch(todoID);
  
    if (todo.createdAt === null) {
        res.status(404).json({
            error: "Todo with specified ID not found."
        });
    }

    await todoRepository.remove(todoID);
    res.json(todo);
});

export default router;
