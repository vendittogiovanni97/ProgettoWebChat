import { Router } from "express";
import login from "../controllers/auth/login.contr";
import { checkAuth } from "../middleware/isLogginMiddleware";
import { logout } from "../controllers/auth/loggout";
import { register } from "../controllers/auth/register.contr";


const accountRoutes = (app:Router) => {
  const router = Router();

  router.post("/register", register);
  router.post("/login", login);
  router.post("/logout", [checkAuth], logout );
  router.put("/password",)

  app.use("/account", router)
}

export default accountRoutes