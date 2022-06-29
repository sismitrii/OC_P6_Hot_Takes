const express = require('express');

const app = express();

app.use((req, res,next)=> {
    res.end("test");
})

module.exports = app;