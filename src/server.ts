import env from "dotenv";
import express from "express";
import routes from "./routes";
env.config();
const app = express();
app.use(express.json());
//  app.use(express.urlencoded());

app.use(routes);

app.listen(3000);

// 