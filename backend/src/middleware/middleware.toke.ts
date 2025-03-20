

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }

  export const authenticateToken = (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): void => {
    // Ottieni il token dall'header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"
    
    if (!token) {
      res.status(401).json({ message: 'Token mancante' });
      return;
    }
    
    if(process.env.TOKEN_SECRET === undefined) {
      res.status(500).json({ message: 'Errore interno del server' });
      return; 
    }
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err: any, user: any) => {
      if (err) {
        res.status(403).json({ message: 'Token non valido' });
        return;
      }
      
      // Se il token è valido, salva l'utente nella richiesta
      req.user = user;
      next();
    });
  };  