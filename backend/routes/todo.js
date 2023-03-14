import express from 'express';
import bodyParser from 'body-parser';
import dayjs from 'dayjs';

const router = express.Router();
const jsonParser = bodyParser.json({ extended: false });

const toFormatDateTime = (dateObject) => {
    return dayjs(dateObject).format("DD/MM/YYYY HH:mm");
};

/*
 *  GET /
 *  Returns all todo entries
 */
router.get("/", (_, res) => {
    res.send("TODO: GET /");
});

/*
 *  POST /create
 *  Takes a form data (name, description) and creates a new
 *  todo entry in Redis.
 */
router.post("/create", jsonParser, (req, res) => {
    const todoName = req.body.name;

    if (!todoName) {
        res.status(400).json({
            error: "You must specify a name for Todo."
        });
    }

    const todoDescription = req.body.description || "";
    const todoCreatedAt = Date.now();
    
    // TODO: Save the Todo object into Redis database.

    res.json({
        // TODO: Add returning todo ID, and status.
        name: todoName,
        description: todoDescription,
        createdAt: toFormatDateTime(todoCreatedAt),
    })
});

/*
 *  PUT /edit/:id
 *  Update todo of `id` to new object.
 */
router.put("/edit/:id", jsonParser, (req, res) => {
    res.send(`TODO: PUT /edit/${req.params.id}`);
});

/*
 *  DELETE /delete/:id
 *  Delete todo of `id` from database.
 */
router.delete("/delete/:id", (req, res) => {
    res.send(`TODO: DELETE /delete/${req.params.id}`);
});

export default router;
