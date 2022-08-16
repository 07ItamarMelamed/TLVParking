const express = require('express');
const app = express();
const port = 3000;
const {getAll, getById, deleteById, addParking} = require('/js/server/utils.js');

app.use(express.json());

app.get('/parkings', (req, res) => {
    res.send(getAll());
})

app.get('/parkings/:id', (req, res) => {
    res.send(getById(+req.params.id));
})

app.delete('/parkings/:id', (req, res) => {
    res.send(deleteById(+req.params.id));
});

app.post('/parkings', (req, res) => {
    res.send(addParking(req.body));
});

app.listen(port, () => console.log(`Listening on port ${port}...`));