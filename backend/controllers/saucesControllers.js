const Sauce = require("../models/saucesModel")
const fs = require("fs");

/**
 * Creation de sauce.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    // delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        // userId: req.auth.UserId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauce.save()
        .then(() => { res.status(201).json({ message: "Objet enregistré !" }) })
        .catch(error => { res.status(400).json({ error }) });
};

/**
 * Modification de sauce.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

/**
 * Suppression de sauce.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteSauce = (req, res, next) => {
    // Recuperation de la sauce.
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // Verification si l'userId est bien le bon.
            if (sauce.userId != req.auth.userId) {
                // Si ce n'est pas le bon, message d'erreur.
                res.status(401).json({ message: "Non-autorisé" });
                // Si c'est le bon.
            } else {
                // Recuperation du nom de fichier grace a split.
                const filename = sauce.imageUrl.split("/images")[1];
                fs.unlink(`images/${filename}`, () => {
                    // Suppression de l'enregistrement dans la bdd.
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: "Objet supprimé !" }) })
                        .catch(error => res.status(401).json(error));
                })
            }
        })
        .catch(error => { res.status(500).json({ error }) });
};

/**
 * Fonction utile pour recuperer une sauce avec son id.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getOneSauce = (req, res, next) => {
    // Methode findOne pour mettre a jour UN element.
    Sauce.findOne({ _id: req.params.id })
        // Renvoi de la reponse de reussite avec un code 200.
        .then((sauce) => res.status(200).json(sauce))
        // Renvoi de la reponse d'erreur avec un code 400.
        .catch(error => res.status(400).json({ error }));
};

/**
 * Fonction utilisee pour voir toutes les sauces dans la bdd.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        // Recuperation d'un tableau contenant tous les things dans notre bdd.
        .then(sauce => res.status(200).json(sauce))
        // Renvoi de la reponse d'erreur avec un code 400.
        .catch(error => res.status(400).json({ error }));
};