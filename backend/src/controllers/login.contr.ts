import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { SessionManager } from "../sessionData";
import { Cookie, SessionData } from "express-session";
import dbClient from "../configuration/db.config";
import { LoginInfo } from "infoSchema";

const login = async (
  request: Request<undefined, unknown, LoginInfo>,
  response: Response
) => {
  const {body} = request;
  console.log('dati', body)

  const user = await dbClient.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user === null) {
    response.statusMessage = "Wrong credentials";
    response.status(400).json("Wrong credentials");
    console.log("duestronzate")
    return;
  }

  const hashedPassword = user.password;
  const isCorrect = await bcrypt.compare(body.password, hashedPassword);

  if (!isCorrect) {
    response.statusMessage = "Wrong credentials";
    response.status(400).json("Wrong credentials");
    return;
  }

  
  request.session.id= user.id;
  request.session.email = user.email;
  request.session.username = user.username;

  // Crea la sessione
  const sessionManager = SessionManager.getInstance();
  const sessionData: SessionData = {
    id: user.id,
    email: user.email,
    username: user.username,
    cookie: new Cookie(),
  };

  // Salva la sessione
  sessionManager.createSession(sessionData);




  response.status(200).json("User logged in");
};

export default login;
