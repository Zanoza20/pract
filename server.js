const express = require('express');
const app = express();
const port = 63342;

app.use(express.json());

let products = [];

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;
    products[id] = updatedProduct;
    res.json(updatedProduct);
});

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    products.splice(id, 1);
    res.send('Товар було видалено');
});

app.listen(port, () => {
    console.log(`Сервер працює на порту ${port}`);
});
