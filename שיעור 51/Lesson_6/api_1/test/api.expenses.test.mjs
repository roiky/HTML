import { expect } from "chai";
import axios from "axios";
import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const URL = "http://localhost:3000/auth/";
let testUserID;
let dbConnection;

const createExpensesTable = () => {
    return `CREATE TABLE northwind.expenses (
  id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATETIME NOT NULL,
  category VARCHAR(45) NOT NULL,
  description VARCHAR(45) NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC)
);
`;
};

describe("Test Login API POST /Login", () => {
    // BEFORE – פותחים את החיבור
    before(async () => {
        dbConnection = await mysql2.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: Number(process.env.DB_PORT) || 3306,
            multipleStatements: true,
        });
    });

    after(async () => {
        if (dbConnection) {
            await dbConnection.end();
        }
    });

    it("create expenses table", async () => {
        // await dbConnection.execute("DROP TABLE IF EXISTS northwind.expenses");
        // await dbConnection.execute(createExpensesTable(), []);
    });
});
