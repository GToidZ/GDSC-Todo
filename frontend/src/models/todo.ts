export const API_LINK = "http://127.0.0.1:8080" // replace this with Docker network

export interface todoModel {
    entityId: string,
    name: string,
    description: string,
    createdAt: Date,
    done: boolean,
    favorited: boolean
};