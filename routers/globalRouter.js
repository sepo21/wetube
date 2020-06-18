import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { join, login, logout } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, search);
globalRouter.get(routes.login, join);
globalRouter.get(routes.logout, login);
globalRouter.get(routes.search, logout); 

export default globalRouter;