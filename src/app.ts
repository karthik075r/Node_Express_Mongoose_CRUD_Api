import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import EmployeeRoute from "../src/api/Employee/routes";

// Connect To Database
mongoose.Promise = global.Promise;
mongoose.connect(`${process.env.DB_PATH}${process.env.DB_NAME}`, {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// On Connection
mongoose.connection.on("connected", () => {
  console.log("Connected to database ");
});

// On Error
mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useCreateIndex", true);
// Port Number
const port = 8000;

const app: express.Application = express();

app.use(
  cors({
    exposedHeaders: ["Content-Disposition"],
  })
);

// Body Parser Middleware
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

// Index Route
app.get("/", (req, res) => {
  res.status(404).send("Invalid Endpoint");
});

app.use("/api", EmployeeRoute);

app.get("*", (req, res) => {
  res.status(404).send("Invalid Endpoint");
});

app.listen(port, () => console.log(`server running at port ${port}`));
