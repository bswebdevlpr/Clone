const express = require('express');
const fs = require('fs');
// const template = require('./lib/template.js');

const app = express();


app.get('/', (req, res) => {
    fs.readdir('./data', (err, fileLis) => {
        var title = 'Welcome';
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
