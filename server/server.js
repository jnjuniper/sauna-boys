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
    const searchTerm = req.query.search || ""; // Default to an empty string if no search term is provided

    const select = db.prepare(`
        SELECT id, image, productName, productDescription, brand, SKU, price, slug 
        FROM products
        WHERE productName LIKE ?
    `);

    const products = select.all(`%${searchTerm}%`); // Using the LIKE operator to find products that match the search term

    res.json(products);
});
app.get("/api/products/:slug", (req, res) => {
    const { slug } = req.params;
    const select = db.prepare(`
        SELECT id, image, productName, productDescription, brand, SKU, price, slug
        FROM products 
        WHERE slug = ?
    `);
    const product = select.get(slug);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

// Get similar products (example: products with the same brand, excluding the current product)
app.get("/api/similar-products/:slug", (req, res) => {
    const { slug } = req.params;
    const product = db.prepare("SELECT brand FROM products WHERE slug = ?").get(slug);
    if (product) {
        const selectSimilar = db.prepare(`
            SELECT id, image, productName, productDescription, brand, SKU, price, slug
            FROM products 
            WHERE brand = ? AND slug != ? 
            LIMIT 3
        `);
        const similarProducts = selectSimilar.all(product.brand, slug);
        res.json(similarProducts);
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});
app.get("/api/heroImages", (req, res) => {

    const select = db.prepare("SELECT id, image, altText, imageDescription FROM heroImages");

    const heroImages = select.all();

    res.json(heroImages);
})

app.get("/api/spots", (req, res) => {
    const select = db.prepare("SELECT id, image, altText, title FROM spots");
    const spots = select.all();
    res.json(spots);
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});