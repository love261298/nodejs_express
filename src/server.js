import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import router from "./routes/index.js";
const app = express();

connect(process.env.URI_DB);

app.use(express.json())

app.use("/api", router)

app.listen(process.env.PORT, ()=> {console.log(`Sever is running on port ${process.env.PORT}`);});