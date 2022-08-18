// Importation du modele de sauce.
const Sauce = require("../models/saucesModel")

exports.likeSauce = (req, res) => {
    if (req.body.like === 1) {
        // Mise a jour de la sauce dans la bdd, et de son array.
        Sauce.updateOne(
            { _id: req.params.id },
            {
                // Utilisation de l'operateur $inc.
                $inc: { likes: req.body.like++ },
                $push: { usersLiked: req.body.userId }
            })

            .then(() => res.status(200).json({ message: '+1 like !' }))
            .catch(error => res.status(400).json({ error }))

    } else if (req.body.like === -1) {
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { dislikes: (req.body.like++) * -1 },
                // Utilisation de l'operateur $push.
                $push: { usersDisliked: req.body.userId }
            })

            .then(() => res.status(200).json({ message: '+1 dislike !' }))
            .catch(error => res.status(400).json({ error }))

    } else {
        // Recuperation de la sauce dans la bdd.
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                // Utilisation de la methode includes().
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id },
                        {
                            // Utilisation de l'operateur $pull.
                            $pull: { usersLiked: req.body.userId },
                            $inc: { likes: -1 }
                        })

                        .then(() => res.status(200).json({ message: 'like -1 !' }))
                        .catch(error => res.status(400).json({ error }))

                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 }
                        })
                        .then(() => res.status(200).json({ message: 'Dislike -1 !' }))
                        .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(400).json({ error }))
    }
}