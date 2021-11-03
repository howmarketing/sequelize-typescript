import express, { Request, Response } from "express";
const routes = express.Router();

routes.get("/", (req: Request, res: Response) => {
  return res.status(200).jsonp({ msg: "Hello" });
});

routes.get("/teste", (req: Request, res: Response) => {
  return res.jsonp({ path: req?.path || "" });
});

export default routes;
