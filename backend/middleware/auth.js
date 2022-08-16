// Importation du package jsonwebtoken.
const jwt = require("jsonwebtoken");

/**
 * Middleware permettant d'extraire et de verifier si il est valide.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
    // Insertion du code dans un bloc try ... catch pour pallier aux nombreux problèmes qui peuvent survenir.
    try {
        // Extraction du token du header de la requete entrante.
        // Utilisation de la fonction split pour recuperer apres l'espace dans le header.
        const token = req.headers.authorization.split(' ')[1];
        // Utilisation de la fonction verify pour decoder le token.
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        // Extraction de l'userId du token.
        const userId = decodedToken.userId;
        // Ajout de l'userId dans l'objet afin que les routes puissent l'exploiter.
        req.auth = {
            userId: userId
        };
        // Utilisation de la fonction next() pour executer le middleware.
        next();
    } catch (error) {
        // Affichage des erreurs.
        res.status(401).json({ error });
    }
}