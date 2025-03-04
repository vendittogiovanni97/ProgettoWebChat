import express from "express";
import dotenv from "dotenv";
import expressSession from "express-session";
import cors from "cors";
import expressWs from 'express-ws';
import { addWsRoutes } from "./routes-websocket/index-websocket";
import http from 'http';
import addRoutes from "./routes";
import { WebSocketManager } from "./websocket-server";


dotenv.config();

const port = process.env.PORT; 

if (process.env.SESSION_SECRET === undefined) {
  throw new Error("Define SESSION_SECRET");
}

const app = express();
const server = http.createServer(app);
const appws= expressWs(app);

app.use((request, response, next) => {
  console.log(request.method, request.url);

  next();
});

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: true,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000,
    sameSite: 'strict',
    secure: false
  }
}))
const webSocketManager = new WebSocketManager(server);

addRoutes(app);
addWsRoutes(app);


server.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`)
})

//nmpi i express-fileupload / npm i n--save-dev @type/espress-fileupload