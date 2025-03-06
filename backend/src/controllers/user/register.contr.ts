import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dbClient from "../../configuration/db.config";
import { RegisterInfo } from "infoSchema";
import { RegisterInfoSchema } from "../../validation/schemaValidation";
import { EmailManager } from "../../types/EmailManager";
import { oggi } from "../../configuration/time.config";
import { AppError } from "errorType";
import { ErrorCodes } from "../../constants/errorCodes";

export const register = async (
  request: Request<undefined, unknown, RegisterInfo>,
  response: Response
) => {
  const body = request.body;
  console.log("Received body:", body);

  const verifiedBody = RegisterInfoSchema.safeParse(body);

  if (verifiedBody.success === false) {
    throw new AppError(400, ErrorCodes.INVALID_INPUT, "Dati di registrazione");
  }
  const passwordHash = await bcrypt.hash(verifiedBody.data.password, 12);

  try {
    const newUser = await dbClient.user.create({
      data: {
        email: verifiedBody.data.email,
        username: verifiedBody.data.username,
        password: passwordHash,
      },
    });
    // Invia email in maniera asincrona
    await EmailManager.getInstance().sendEmail([verifiedBody.data.email], "Benvenuto nella nostra applicazione",`<h1>Benvenuto, ti sei iscritto ${verifiedBody.data.username}</h1>`)

    return response.status(200).json({
      success: true,
      message: "Utente registrato con successo",
      userId: newUser.id
    })
  } catch (error) {
    console.error(error);
    if (error === "P2002") {
      // Gestione del caso di email o username duplicati
      response.status(409).json();
    } else {
      response.status(409).json("Email or username already exists");
    }
  }
};

