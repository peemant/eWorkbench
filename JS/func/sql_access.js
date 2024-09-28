import pg from "pg";
const { Pool } = pg;

const dataClient = new pg.Client({
    user: "postgres",
    host:"localhost",
    database:"eWorkbench",
    password:"Tr0yw1nter!",
    port: "4567",
});

const dataPool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database:"eWorkbench",
    password:"Tr0yw1nter!",
    port: "4567",
    max: 20,
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 1000,
    allowExitOnIdle: true,
});

export function getSQLClient(){
    return dataClient;
}

export function getSQLPool(){
    return dataPool;
}