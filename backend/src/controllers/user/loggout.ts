import {Request, Response} from "express"


export const logout = async (request: Request, response: Response) => {
    request.session.destroy((error) => {
      if (error) {
        response.status(500).send();
        return;
      }
  
      response.clearCookie('connect.sid');
      response.status(200).send();
    })
  }