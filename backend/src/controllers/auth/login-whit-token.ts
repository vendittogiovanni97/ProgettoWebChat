// File: src/controller/auth.controller.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbClient from "../../configuration/db.config";
import { LoginInfo } from "../../types/infoSchema";
import { AppError } from "../../types/errorType";
import { responseStatus } from "../../constants/status";
import { ErrorCodes } from "../../constants/errorCodes";
import {  Request, Response } from "express";
// Tipo per la sessione personalizzata con token
interface TokenPayload {
  Id: number;
  username: string;
}

// Login con generazione di token
export const loginToken = async (
  req: Request<undefined, unknown, LoginInfo>, 
  res: Response, 
): Promise<any> => {
  try {
    console.log('ENTRO IN /LOGIN TOKEN');
    const { email, password } = req.body;

    console.log("dati", email, password);

    const user = await dbClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user === null) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.INVALID_CREDENTIALS,
        "Credenziali non valide"
      );
    }

    const hashedPassword = user.password;
    const isCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isCorrect) {
      throw new AppError(
        responseStatus.BAD_REQUEST,
        ErrorCodes.INVALID_CREDENTIALS,
        "Credenziali non valide"
      );
    }

    console.log('credenziali verificate, genero il token');
    
    if(process.env.TOKEN_SECRET === undefined) {
      throw new Error("Errore nel recupero della variabile d'ambiente TOKEN_SECRET");
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.TOKEN_SECRET,
      { expiresIn: '7d' }
    );
    
    // Invia il token al client e TERMINA qui
    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username
      },
      token,
      message: "Login completato"
    });
  } catch (error) {
    console.log('il login mi ha dato errore: ', error);
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};



// Logout
export const logoutToken = async (req: Request, res: Response) => {
  console.log('ENTRO IN /LOGOUT');
  try {
    // In questo approccio semplificato, il logout è gestito solo lato client
    // Il client deve eliminare il token memorizzato
    res.status(200).json({ message: "Logout completato" });
  } catch (error) {
    console.log('il logout mi ha dato errore: ', error);
    return res.status(500).json({ message: 'Errore interno del server' });
  }
};