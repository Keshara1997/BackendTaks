import express from 'express';
import config from './config/config1';
import database from './db/database';

database();


const app = express();
const port = config.port;


app.get('/', (req, res) => {
    res.send('Hello World!');
});

const server = async () => {
 app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
};

server();
