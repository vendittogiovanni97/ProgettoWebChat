import { Router, Express } from "express";




export const addWsRoutes = (app: Express) => {
    const wsRouter = Router();
  
    //invianotifica(metodoinvionotifiche)
    //ecc

  
    app.use('/ws', wsRouter);
  }