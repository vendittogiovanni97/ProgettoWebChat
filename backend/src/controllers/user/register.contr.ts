import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dbClient from "../../configuration/db.config";
import { RegisterInfo } from "infoSchema";
import { RegisterInfoSchema } from "../../validation/schemaValidation";
import { EmailManager } from "../../types/EmailManager";
import { oggi } from "../../configuration/time.config";

export const register = async (
  request: Request<undefined, unknown, RegisterInfo>,
  response: Response
) => {
  const body = request.body;
  console.log("Received body:", body);

  const verifiedBody = RegisterInfoSchema.safeParse(body);

  if (verifiedBody.success === false) {
    response.status(400).json(verifiedBody.error);
    return;
  }
  const passwordHash = await bcrypt.hash(verifiedBody.data.password, 12);

  try {
    await dbClient.user.create({
      data: {
        email: verifiedBody.data.email,
        username: verifiedBody.data.username,
        password: passwordHash
      },
    });
    response.status(200).json("User registered successfully");

///////////////////////////////////////////////////////////////

   async function mandaEmail() {
        try {
            const emailManager = EmailManager.getInstance();
            await emailManager.sendEmail(
                [verifiedBody.data!.email],  
                "Mail di benvenuto", 
                `Benvenuto, ti sei iscritto ${oggi}` 
            );
            console.log('Email inviata con successo!');
        } catch (errore) {
            console.error('Errore nell\'invio email:', errore);
        }
    }
    mandaEmail();

///////////////////////////////////////////////////////////

  } catch (error) {
    console.error(error);
    if (error === "P2002") {
      // Gestione del caso di email o username duplicati
      response.status(409).json("Email or username already exists");
    } else {
      response.status(409).json("Email or username already exists");
    }
  }
};
