const express = require("express");
const app = express();
const mongoose = require("mongoose");
// Importation du modele Mongoose dans l'application.
const thing = require("./models/thing");

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

/**
 * 
 */
app.post("/api/stuff", (req, res, next) => {
    // Suppression de l'id car Mongoose en envoie un par defaut.
    delete req.body._id;
    // Creation d'une instance du modele.
    const thnig = new thing({
        // Raccourci JS pour recuperer l'objet plus rapidement.
        ...req.body
    });
    // Creation de la methode save qui enregistre notre methode dans la base de donnees.
    thing.save()
    // Renvoi de la reponse de reussite avec un code 201.
    .then(() => res.status(201).json({message: "Objet enregistré !"}))
    // Renvoi de la reponse d'erreur avec un code 400.
    .catch(error => res.status(400).json({ error }));
});

/**
 * 
 */
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
    // Recuperation des tableaux des things.
    .then(things => res.status(200).json(things))
    // Renvoi de la reponse d'erreur avec un code 400.
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;