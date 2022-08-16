const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;

const {getAll, getById, deleteById, addParkingToList} = require('./utils');

app.use(cors());
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(express.json());

app.get('/parkings', (req, res) => {
    res.send(getAll());
})

app.get('/parkings/:id', (req, res) => {
    const p = getById(req.params.id);
    if (!p) {
        return res.status(404).send("The parking with the given ID was not found.");
    } else {
        return res.send(p);
    }
})

app.delete('/parkings/:id', (req, res) => {
    deleteById(+req.params.id, res);
});

app.post('/parkings', (req, res) => {
    res.send(addParkingToList(req.body));
});

app.listen(port, () => console.log(`Listening on port ${port}...`));