const express = require('express');
const app = express();
const port = 3000;
const {getAll, getById, deleteById, addParking} = require('js/server/utils.js');

app.use(express.json());

app.get('/api/books', (req, res) => {
    res.send(getBooks());
})

app.get('/api/books/:id', (req, res) => {
    res.send(getBookById(parseInt(req.params.id)));
})

app.post('/api/books', (req, res) => {
    const newBook = createBook(req.body);
    getBooks().push(newBook);
    res.send(newBook);
});

app.delete('/api/books/:id', (req, res) => {
    const deletedBook = deleteBook(parseInt(req.params.id));
    res.send(deletedBook);
});

app.put('/api/books/:id', (req, res) => {
    const updatedBook = updateBook(parseInt(req.params.id), req.body);
    res.send(updatedBook);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));