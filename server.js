
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Array of items
let items = [
    { id: 1, name: 'Book', price: 250 },
    { id: 2, name: 'Pen', price: 25 }
];

let id = 3;

// CREATE
app.post('/items', (req, res) => {

    const item = {
        id: id++,
        name: req.body.name,
        price: req.body.price
    };

    items.push(item);
    res.json(item);

});

// READ
app.get('/items', (req, res) => {

    res.json(items);

});

// UPDATE
app.put('/items/:id', (req, res) => {

    const item = items.find(
        i => i.id === parseInt(req.params.id)
    );

    if (!item) {
        return res.status(404).send('Item not found');
    }

    item.name = req.body.name;
    item.price = req.body.price;

    res.json(item);

});

// DELETE
app.delete('/items/:id', (req, res) => {

    items = items.filter(
        i => i.id !== parseInt(req.params.id)
    );

    res.send('Item deleted successfully');

});

// START SERVER
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
