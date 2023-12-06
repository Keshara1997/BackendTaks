import dotenv from 'dotenv';

dotenv.config();

export interface IConfig {
    dbHost: string;
   dbUser: string;
   dbPassword: string;
   dbDatabase: string;  
    dbPort: number;
    port: number;
}

const config: IConfig = {
    dbHost: process.env.DB_HOST || "localhost",
    dbUser: process.env.DB_USER || "backendtest",
    dbPassword: process.env.DB_PASSWORD || "backendtest",
    dbDatabase: process.env.DB_DATABASE || "mifostenant-default",
    dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3367,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  
};

export default config;