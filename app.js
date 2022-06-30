const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

mongoose.connect('mongodb+srv://UserOfOC:Azerty01.@clusteroc.ndiye.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, // don't find why this is needed
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json()); // add body to request if Content-Type : application/json

// add these header to all the request 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})


app.use('/api/auth', authRoutes);
app.use((req, res,next)=> {
    res.status(200).json({message : "working"})
});

module.exports = app;