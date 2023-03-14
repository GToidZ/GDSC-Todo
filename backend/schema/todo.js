import { Schema, Entity } from "redis-om";

class Todo extends Entity {}
const todoSchema = new Schema(Todo, {
  id: { type: 'number' },
  name: { type: 'string' },
  description: { type: 'string' },
  createdAt: { type: 'date' },
  done: { type: 'boolean' }
}, { dataStructure: 'JSON' });

export {Todo, todoSchema};
