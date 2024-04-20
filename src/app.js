const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/users', (req, res) => {
    res.send("users");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
