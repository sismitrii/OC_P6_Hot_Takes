/*=============================================================*/
/*------------------------ IMPORT -----------------------------*/
/*=============================================================*/
const exp = require('constants');
const express = require('express');
const mongoose = require('mongoose');
const { dirname } = require('path');
const path = require('path');

const authRoutes = require('./routes/auth');
const sauceRoutes = require('./routes/sauce');


/*=== Connect to MongoDb ===*/
mongoose.connect('mongodb+srv://UserOfOC:Azerty01.@clusteroc.ndiye.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, // don't find why this is needed
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json()); // add body to request if Content-Type : application/json


/*=============================================================*/
/*------------------------ HEADERS ----------------------------*/
/*=============================================================*/

// add these header to all the request 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})


/*=============================================================*/
/*------------------------- ROUTES ----------------------------*/
/*=============================================================*/

app.use('/api/auth', authRoutes);
app.use('/api/sauces', sauceRoutes);

app.use('/images', express.static(path.join(__dirname, 'images'))); // A REVOIR !!!



module.exports = app;