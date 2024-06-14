import express from "express";
import { createTable } from "./config/sql.js";

const app = express();

async function init() {
  try {
    await createTable();
    serverStart();
  } catch (error) {}
}

function serverStart() {
  app.get("/", (req, res) => {
    return res.status(201).json("it works");
  });
  app.listen(3000);
}

init();
