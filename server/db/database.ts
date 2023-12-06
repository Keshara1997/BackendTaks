import mysql from 'mysql';
// import config from '../config/config1';
import config from '../config/config1';

export const connection = () => {
    const conect = mysql.createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase,
        port: config.dbPort,
    });
    conect.connect((err) => {
        if (err) {
            console.log('Error connecting to Db ' + err);
            process.exit(1);
        }
        console.log('Connection MYSQL DATABASE');
    
    });
    return conect;
} 

export default connection;
