import express from "express";
import { createTable } from "./config/sql.js";
import pkg from "pg";
import bodyParser from "body-parser";
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
  app.use(bodyParser.json());
  app.get("/api/product", async (req, res) => {
    try {
      const resulQuery = await pool.query("SELECT * FROM products");
      const rows = resulQuery.rows;
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(401).json(error);
    }
  });
  app.post("api/products", async (req, res) => {
    const { title, price } = req.body;
    try {
      const resulQuery = await pool.query(
        "INSERT INTO products(title, price) VALUES($1, $2)"
      );

      const row = resulQuery.rows[0];
      return res.status(201).json(row);
    } catch (error) {
      return res.status(401).json(error);
    }
  });
  app.listen(3000);
}

init();
