const express = require("express");
const Database = require("better-sqlite3");
const cors = require("cors");

const port = 8000;

const db = new Database("./db/db.db", {
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

app.get("/api/heroImages", (req, res) => {

    const select = db.prepare("SELECT id, image, altText FROM heroImages");

    const heroImages = select.all();

    res.json(heroImages);
})

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});