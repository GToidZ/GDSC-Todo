import { Schema, Entity } from "redis-om";

class Todo extends Entity { }
const todoSchema = new Schema(Todo, {
  name: { type: 'string' },
  description: { type: 'string' },
  createdAt: { type: 'date', sortable: true },
  done: { type: 'boolean' },
  favorited: { type: 'boolean' }
}, { dataStructure: 'JSON' });

export { Todo, todoSchema };
