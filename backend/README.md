# Backend

> See parental `README.md` to easily deploy a production build for both backend and frontend.

# Development Instructions

For development of backend, follow this README to setup a developement environment.

## Prerequisites

You are required to install the following softwares before setting up.

* `Node.js` runtime version 16 or greater
* `yarn` package manager
* `Docker Engine` or `Docker Desktop` 

## Setting Up Redis Instance

To setup a Redis instance, it is recommended to use Docker.
In your terminal execute,

```
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

## Installing Dependencies

To install dependencies for the backend module, 
make sure that in your terminal your working directory is 
at the module's folder; then execute:

```
yarn
```

This command will initialize the current working directory with `yarn.lock` 
or parse existing `yarn.lock` to download dependencies.

## Configuring Environment

Then, you should look at the `sample.env` file to create a new `.env` file
or set your environment variables.

| Variable               | Description                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `NODE_ENV`             | Environment for the module upon launch. (`development` or `production`)                |
| `REDIS_CONNECTION_URL` | Connection URL for Redis. see: https://www.iana.org/assignments/uri-schemes/prov/redis |

## Running in Development Mode

After setting variables, you can start a development server by executing,

```
yarn dev
```

## Running in Production Mode

If you need to deploy, be sure to set the backend module in production mode, 
by changing `NODE_ENV`'s value to `production`. Then execute,

```
yarn start
```

# Endpoints

## GET `/todo`
Returns all todo in the Redis database, with the following schema:
```
[
  { 
    entityId: string,
    name: string,
    description: string,
    createdAt: datetime,
    done: boolean,
    favorited: boolean
  }, {...}, ...
]
```

## POST `/todo/create`
Takes a JSON form data and turns it into a new todo in Redis database, also returns a todo with the following schema:
```
{ 
  entityId: string,
  name: string,
  description: string,
  createdAt: datetime,
  done: boolean,
  favorited: boolean
}
```

## PUT `/todo/edit/:id`
Takes an `:id` query as `entityId` and updates the respective todo with data from JSON form data provided. 
You can use the above schema to update an existing todo. 
Also, returns the updated todo as JSON.

## DELETE `/todo/delete/:id`
Takes an `:id` query as `entityId` and deletes the respective todo.
Also, returns the deleted todo as JSON.
