import express from "express";
import { createTable } from "./config/sql.js";
import pkg from "pg";
const { Pool } = pkg;

const app = express();

const pool = new Pool({
  host: "dpg-cpm62vqju9rs738l4k80-a",
  port: "5432",
  database: "invoice_app_n63t",
  user: "invoice_app_n63t_user",
  password: "lIVTWjkyLDNgVTPCuxCxjFKLgaSqqPuY",
});



async function init() {
  try {
    await createTable();
    serverStart();
  } catch (error) {
    console.error("Error during initialization:", error);
    process.exit(1); // Exit the process with an error code
  }
}

function serverStart() {
  app.get("/", (req, res) => {
    return res.status(201).json("it works");
  });
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
}

init();
