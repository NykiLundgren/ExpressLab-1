const express = require('express');
const app = express();
const PORT = process.env.PORT || 4200;

app.get('/', (req, res) => {
res.send('Welcome.');
});

let items = [
    { id: '0', product: 'Candle', price: '$2.00', quantity: '5'},
    { id: '1', product: 'T-shirt', price: '$10.00', quantity: '10'},
    { id: '2', product: 'Blanket', price: '$20.00', quantity: '3'},
    { id: '3', product: 'Backpack', price: '$25.00', quantity: '5'},
    { id: '4', product: 'Flashlight', price: '$4.00', quantity: '7'},
    { id: '5', product: 'Headphones', price: '$16.00', quantity: '8'}
];

app.get('/items', (req, res) => {
    res.status(200);
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const item = items.find(item => item.id === itemId);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({message: `item ${itemId} doesn't exist`})
    }
});

app.post('/new_item', (req, res) => {
    const item = req.body;

    if (item.id && item.product && item.price && item.quantity){
        items.push({
            ...item,
            id: `${items.length + 1}`,
            product: '',
            price: '',
            quantity: ''
        });
        res.status(201).json({message: 'Item created succenssfully'});
    }
});

app.put('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const item = req.body;

    console.log(`Editing item: ${itemId} to be ${item}`);

    const updatedListItems = [];

    //loop through list to find and replace single item
    items.forEach(oldItem => {
        if (oldItem.id === itemId) {
            updatedListItems.push(item);
        } else {
            updatedListItems.push(oldItem);
        }
    });

    items = updatedListItems;

    res.json(items);
});

app.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
    console.log(`Delete item with id: ${itemId}`);

    const filteredList = items.filter(item => item.id !== itemId);

    items = filteredList;
    res.json(items);
});

app.listen(PORT, () => console.log (`Listening on port ${PORT}`));