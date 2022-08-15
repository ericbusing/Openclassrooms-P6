const thing = require("../models/thing")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createThing = (req, res, next) => {
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
        .then(() => res.status(201).json({ message: "Objet enregistré !" }))
        // Renvoi de la reponse d'erreur avec un code 400.
        .catch(error => res.status(400).json({ error }));
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.modifyThing = (req, res, next) => {
    // Methode findOne pour trouver UN objet.
    thing.findOne({ _id: req.params.id })
        // Renvoi de la reponse de reussite avec un code 200.
        .then(thing => res.status(200).json(thing))
        // Renvoi de la reponse d'erreur avec un code 404.
        .catch(error => res.status(404).json({ error }));
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteThing = (req, res, next) => {
    // Methode deleteOne pour supprimer UN element.
    thing.deleteOne({ _id: req.params.id })
        // Renvoi de la reponse de reussite avec un code 200.
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        // Renvoi de la reponse d'erreur avec un code 400.
        .catch(error => res.status(400).json({ error }));
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getOnThing = (req, res, next) => {
    // Methode updateOne pour mettre a jour UN element.
    thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        // Renvoi de la reponse de reussite avec un code 200.
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        // Renvoi de la reponse d'erreur avec un code 400.
        .catch(error => res.status(400).json({ error }));
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getAllThing = (req, res, next) => {
    thing.find()
        // Recuperation d'un tableau contenant tous les things dans notre bdd.
        .then(things => res.status(200).json(things))
        // Renvoi de la reponse d'erreur avec un code 400.
        .catch(error => res.status(400).json({ error }));
};