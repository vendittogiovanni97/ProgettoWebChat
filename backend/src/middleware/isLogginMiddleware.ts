import { NextFunction, Request, Response} from 'express'

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  let isLoggedIn = false;

  if (req.session.username !== undefined) { //req.session.id o req.....email
    isLoggedIn = true;
  }

  if (!isLoggedIn) {
    res.status(401).json('User must be logged in to access this resource');
    return;
  }

  next();
}