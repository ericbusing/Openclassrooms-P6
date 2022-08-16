const Sauce = require("../models/saucesModel")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        useRId: req.auth.UserId,
        imageUrl: `${req.protocole}://${req.get("host")}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => { res.status(201).json({ message: "Objet enregistré !" }) })
        .catch(error => { res.status(400).json({ error }) })
    // // Suppression de l'id car Mongoose en envoie un par defaut.
    // delete req.body._id;
    // // Creation d'une instance du modele.
    // const sauce = new Sauce({
    //     // Raccourci JS pour recuperer l'objet plus rapidement.
    //     ...req.body
    // });
    // // Creation de la methode save qui enregistre notre methode dans la base de donnees.
    // sauce.save()
    //     // Renvoi de la reponse de reussite avec un code 201.
    //     .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    //     // Renvoi de la reponse d'erreur avec un code 400.
    //     .catch(error => res.status(400).json({ error }));
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.modifySauce = (req, res, next) => {
    // Methode findOne pour trouver UN objet.
    Sauce.findOne({ _id: req.params.id })
        // Renvoi de la reponse de reussite avec un code 200.
        .then(sauce => res.status(200).json(sauce))
        // Renvoi de la reponse d'erreur avec un code 404.
        .catch(error => res.status(403).json({ error }));
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteSauce = (req, res, next) => {
    // Methode deleteOne pour supprimer UN element.
    Sauce.deleteOne({ _id: req.params.id })
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
exports.getOneSauce = (req, res, next) => {
    // Methode updateOne pour mettre a jour UN element.
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
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
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        // Recuperation d'un tableau contenant tous les things dans notre bdd.
        .then(sauces => res.status(200).json(sauces))
        // Renvoi de la reponse d'erreur avec un code 400.
        .catch(error => res.status(400).json({ error }));
};