const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://UserOfOC:Azerty01.@clusteroc.ndiye.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, // don't find why this is needed
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res,next)=> {
    res.status(200).end("other test");
})

module.exports = app;