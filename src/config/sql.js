import pgk from "pg";
const { Pool } = pgk;

const pool = new Pool({
  host: "dpg-cpm62vqju9rs738l4k80-a",
  port: "5432",
  database: "invoice_app_n63t",
  user: "invoice_app_n63t_user",
  password: "lIVTWjkyLDNgVTPCuxCxjFKLgaSqqPuY",
});

export const createTable = async () => {
  return await pool.query(
    " CREATE TABLE IF NOT EXIST products(id SERIAL PRIMARY KEY, title TEXT, price INT)  "
  );
};
