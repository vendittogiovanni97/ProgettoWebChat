import { Router } from "express";
import { register } from "../controllers/user/register.contr";
import login from "../controllers/user/login.contr";
import { checkAuth } from "../middleware/isLogginMiddleware";
import { logout } from "../controllers/user/loggout";


const accountRoutes = (app:Router) => {
  const router = Router();

  router.post("/register", register);
  router.post("/login", login);
  router.post("/logout", [checkAuth], logout );
  router.put("/password",)

  app.use("/account", router)
}

export default accountRoutes