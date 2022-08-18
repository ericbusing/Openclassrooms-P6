const Sauce = require("../models/saucesModel")

exports.likeSauce = (req, res, next) => {
    // Affichage du req.body
    /* La req sera envoyee par body-->raw au format JSON avec ces 2 proprietes.
    {
        "userId": "62fb63f58b9b300ca610b522",
        "likes": 1 
    }*/
    console.log("-->CONTENU req.body.likes - ctrl like");
    console.log(req.body.likes);

    // Recuperation de l'id dans l'Url de la req.
    console.log("-->CONTENU req.params - ctrl like");
    console.log(req.params);

    // Mise au format de l'id pour pouvoir aller chercher l'objet correspondant. 
    console.log("-->id en _id");
    console.log({ _id: req.params.id });

    // Recuperation de la sauce dans la bdd.
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            console.log("-->CONTENU resultat promise : objet");
            console.log(sauce);
            // likes = 1 (likes +1).
            // Utilisation de la methode includes().
            if (!sauce.usersLiked.includes(req.body.userId) && req.body.likes === 1) {
                // Mise a jour de la sauce dans la bdd.
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        // Utilisation de l'operateur $inc.
                        $inc: { likes: 1 },
                        // Utilisation de l'operateur $push.
                        $push: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Sauce like +1" }))
                    .catch((error) => res.status(400).json({ error }));
            }
            // likes = 0 (likes = 0 , pas de vote).
            if (sauce.usersLiked.includes(req.body.userId) && req.body.likes === 0) {
                // Mise a jour de la sauce dans la bdd.
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        // Utilisation de l'operateur $inc.
                        $inc: { likes: -1 },
                        // Utilisation de l'operateur $pull.
                        $pull: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Sauce like 0" }))
                    .catch((error) => res.status(400).json({ error }));
            }

            // likes = -1 (dislikes = +1).
            if (!sauce.usersDisliked.includes(req.body.userId) && req.body.likes === -1) {
                // Mise a jour de la sauce dans la bdd.
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        // Utilisation de l'operateur $inc.
                        $inc: { dislikes: 1 },
                        // Utilisation de l'operateur $pull.
                        $push: { usersDisliked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Sauce dislike +1" }))
                    .catch((error) => res.status(400).json({ error }));
            }

            // Apres un like = -1 on met un like 0 (likes = 0, pas de vote, on enleve le dislike).
            if (sauce.usersDisliked.includes(req.body.userId) && req.body.likes === 0) {
                // Mise a jour de la sauce dans la bdd.
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        // Utilisation de l'operateur $inc.
                        $inc: { dislikes: -1 },
                        // Utilisation de l'operateur $pull.
                        $pull: { usersDisliked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Sauce like 0" }))
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(404).json({ error }));
};