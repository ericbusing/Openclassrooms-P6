const express = require("express");
const app = express();
const mongoose = require("mongoose");
// Importation du routeur sauces.
const saucesRoutes = require("./routes/saucesRoutes");
// Importation du routeur users.
const usersRoutes = require("./routes/usersRoutes");
// Importation de path.
const path = require('path');
// Importation de dotenv.
const dotenv = require("dotenv");
const result = dotenv.config();
// Importation du plugin helmet.
const helmet = require("helmet");
// Importation du plugin express-mongo-sanitize.
const mongoSanitize = require('express-mongo-sanitize');

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// Autorisation des points et des caracteres exclus qui seront remplaces par un "underscore".
app.use(
    mongoSanitize({
        allowDots: true,
        replaceWith: '_',
    }),
);
// Message d'erreur si un utilisateur tente un caractere.
app.use(
    mongoSanitize({
        onSanitize: ({ req, key }) => {
            console.warn(`This request[${key}] is sanitized`, req);
        },
    }),
);

// Enregistrement du routeur sauces.
app.use("/api/sauces", saucesRoutes);
// Enregistrement du routeur users.
app.use("/api/auth", usersRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(helmet());
// Appel du plugin mongoSanitize pour supprimer les donnees en utilisant ces valeurs par defaut.
app.use(mongoSanitize());

// Exportation du module.
module.exports = app;