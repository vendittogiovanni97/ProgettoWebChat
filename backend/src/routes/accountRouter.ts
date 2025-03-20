import { Request, Router } from "express";
import login from "../controllers/auth/login.contr";
import { checkAuth } from "../middleware/isLogginMiddleware";
import { logout } from "../controllers/auth/loggout";
import { register } from "../controllers/auth/register.contr";
import { authenticateToken } from "../middleware/middleware.toke";
import { loginToken } from "../controllers/auth/login-whit-token";


const accountRoutes = (app:Router) => {
  const router = Router();

  router.post("/register", register);
  router.post("/login", login);
  router.post("/logout", [checkAuth], logout );
  router.put("/password",)
  router.post("/loginToken", authenticateToken , (req, res) => loginToken(req as any, res) ); 


  app.use("/account", router)
}

export default accountRoutes