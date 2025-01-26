import express from "express";

import { create, getAll, getDetail, remove, update } from "../controllers/product.js";
import { checkPermission } from "../middlewaves/checkPermission.js";
const routerProduct = express.Router();

routerProduct.get("/",getAll );

routerProduct.get("/:phone",getDetail);

routerProduct.post("/",checkPermission, create);

routerProduct.put("/:phone",checkPermission, update);

routerProduct.delete("/:phone",checkPermission, remove);

export default routerProduct;