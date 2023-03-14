import { createClient } from "redis";

let redis = undefined;

const getRedis = async () => {
    if (redis === undefined) {
        redis = createClient();
        redis.on('error', err => console.log('Redis Client Error', err));
        await redis.connect();
    }
    return redis;
};

export { getRedis };
