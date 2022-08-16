// Importation du package de hachage.
const bcrypt = require("bcrypt");
// Importation du package jsonwebtoken, afin de creer et de verifier les tokens d'authentification.
const jwt = require("jsonwebtoken");
// Importation du modele User.
const User = require("../models/usersModel");

/**
 * Creation d'utilisateur.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.signup = (req, res, next) => {
    // Utilisation de la methode hash afin de crypter le mot de passe.
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/**
 * Verification si l'utilisateur existe deja dans notre bdd.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: "Paire identifiant/ mot de passe incorrecte" });
            } else {
                // Utilisation de la methode compare, afin de comparer un string avec un hash 
                // et savoir si il correspond à celui enregistre dans notre bdd.
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        // Si il ne correspond pas alors message d'erreur.
                        if (!valid) {
                            res.status(401).json({ message: "Paire identifiant/ mot de passe incorrecte" });
                        } else {
                            // Sinon renvoi de l'userId et d'un token encode au frontend.
                            res.status(200).json({
                                userId: user._id,
                                // Utilisation de sign pour chiffrer un nouveau token.
                                token: jwt.sign(
                                    { userId: user._id },
                                    // Utilisation d'une chaine secrete temporaire pour crypter le token.
                                    "RANDOM_TOKEN_SECRET",
                                    // Duree de validite du token.
                                    { expiresIn: "24h" }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};