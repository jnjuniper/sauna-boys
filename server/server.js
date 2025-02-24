const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");

const port = 8000;

const db = new Database("./db/products.db", {
    verbose: console.log,
});

const app = express();

app.use(cors ({
    origin: ["http://localhost:3000"]
}));

app.get("/api/products", (req, res) => {

    const select = db.prepare("SELECT id, image, productName, productDescription, brand, SKU, price FROM products");

    const products = select.all();

    res.json(products);
})

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});