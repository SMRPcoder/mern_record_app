import { Router } from "express";
import { login } from "../controller/AuthController";

const AuthRouter=Router();

AuthRouter.post("/login",login);

export default AuthRouter;