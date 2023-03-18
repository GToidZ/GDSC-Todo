import * as redisModule from 'redis';
import { Client } from 'redis-om';

/** @type { Client } */
let redis = process.env.NODE_ENV;
let reconnectAttempts = 0;

const getRedis = async () => {
    if (redis === undefined) {
        let conn = redisModule.createClient({
            socket: {
                reconnectStrategy: (_, cause) => {
                    if (reconnectAttempts >= 10) {
                        return cause;
                    }
                    reconnectAttempts++;
                    return 1000;
                }
            }
        });
        conn.on('connect', () => console.log('Connecting to Redis...'));
        conn.on('ready', () => console.log('Connected to Redis!'));
        conn.on('error', err => console.log('Redis Client Error', err));
        await conn.connect();
        redis = new Client().use(conn);
    } else {
        let conn = redisModule.createClient({
            url: redis
        });
        conn.on('connect', () => console.log('Connecting to Redis...'));
        conn.on('ready', () => console.log('Connected to Redis!'));
        conn.on('error', err => console.log('Redis Client Error', err));
        await conn.connect();
        redis = new Client().use(conn);
    }
    return redis;
};

export { getRedis };
