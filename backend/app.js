const express = require("express");
const app = express();
const mongoose = require("mongoose");
// Importation du routeur sauces.
const saucesRoutes = require("./routes/saucesRoutes");
// Importation du routeur users.
const usersRoutes = require("./routes/usersRoutes");
// Importation de path.
const path = require('path');

mongoose.connect('mongodb+srv://EricB:Waltheisen13@cluster0.s7qp0zt.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

/**
 * 
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// Enregistrement du routeur sauces.
app.use("/api/sauces", saucesRoutes);
// Enregistrement du routeur users.
app.use("/api/auth", usersRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;