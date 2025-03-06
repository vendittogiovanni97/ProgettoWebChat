import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { SessionManager } from "../../sessionData";
import { Cookie, SessionData } from "express-session";
import dbClient from "../../configuration/db.config";
import { LoginInfo } from "infoSchema";
import { AppError } from "errorType";
import { ErrorCodes } from "../../constants/errorCodes";

const login = async (
  request: Request<undefined, unknown, LoginInfo>,
  response: Response
) => {
  const { body } = request;
  console.log("dati", body);

  const user = await dbClient.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user === null) {
    throw new AppError(
      400,
      ErrorCodes.INVALID_CREDENTIALS,
      "Credenziali non valide"
    );
  }

  const hashedPassword = user.password;
  const isCorrect = await bcrypt.compare(body.password, hashedPassword);

  if (!isCorrect) {
    throw new AppError(
      400,
      ErrorCodes.INVALID_CREDENTIALS,
      "Credenziali non valide"
    );
  }

  request.session.id != user.id;
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
  return response.status(200).json({
    succes: true,
    message: "Login effetuato con successo",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
};

export default login;

//tag nfg per page personale
