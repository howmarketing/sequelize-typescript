import env from "dotenv";
env.config();
import express from "express";
import "./database";
import routes from "./routes";
const app = express();
app.use(express.json());
app.use(routes);
app.listen(3000);

// import { User } from "@models/User";
// import { Project } from "@models/Project";
// import { Category } from "@models/Category";
// import { SaleOrder } from "@models/SaleOrder";
// import { SaleOrderItem } from "@models/SaleOrderItem";
// import { Product } from "@models/Product";
// import { Tech } from "@models/Tech";
// import { UserPhoneNumbers } from "@models/UserPhoneNumbers";

