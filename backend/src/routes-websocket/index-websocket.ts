import { Router, Express } from "express";




export const addWsRoutes = (app: Express) => {
    const wsRouter = Router();
  
    //core rtc
    //core ws
    //   clsse astratta per i due core che implementa i metodi di base
  
    app.use('/ws', wsRouter);
  }