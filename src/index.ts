import http from "http";
import { createConnection } from "typeorm";

import app from "./app";
import connectionOptions from "./config/ormconfig";

const server = http.createServer(app);

createConnection(connectionOptions)
    .then(() => {
        server.listen(process.env.PORT || 443);
    }).catch((error) => {
        console.log(error);
    });


/* TODO 
 *
 *
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
*/



