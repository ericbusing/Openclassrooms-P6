const Sauce = require("../models/saucesModel")

// exports.likeSauce = (req, res, next) => {
// // Affichage du req.body
// /* La req sera envoyee par body-->raw au format JSON avec ces 2 proprietes.
// {
//     "userId": "62fb63f58b9b300ca610b522",
//     "likes": 1 
// }*/
// console.log("-->CONTENU req.body.likes - ctrl like");
// console.log(req.body.likes);

// // Recuperation de l'id dans l'Url de la req.
// console.log("-->CONTENU req.params - ctrl like");
// console.log(req.params);

// // Mise au format de l'id pour pouvoir aller chercher l'objet correspondant. 
// console.log("-->id en _id");
// console.log({ _id: req.params.id });

// Recuperation de la sauce dans la bdd.
//     Sauce.findOne({ _id: req.params.id })
//         .then((sauce) => {
//             // likes = 1 (likes +1).
//             // Utilisation de la methode includes().
//             if (!sauce.usersLiked.includes(req.body.userId) && req.body.likes === 1) {
//                 // Mise a jour de la sauce dans la bdd, et de son array.
//                 Sauce.updateOne(
//                     { _id: req.params.id },
//                     {
//                         // Utilisation de l'operateur $inc.
//                         $inc: { likes: 1 },
//                         // Utilisation de l'operateur $push.
//                         $push: { usersLiked: req.body.userId }
//                     }
//                     )

//                     .then(() => res.status(201).json({ message: "Sauce like +1" }),
//                     console.log("test"))
//                     .catch((error) => res.status(400).json({ error }), console.log(error));
//             }
//             // likes = 0 (likes = 0 , pas de vote).
//             if (sauce.usersLiked.includes(req.body.userId) && req.body.likes === 1) {
//                 // Mise a jour de la sauce dans la bdd, et de son array.
//                 Sauce.updateOne(
//                     { _id: req.params.id },
//                     {
//                         // Utilisation de l'operateur $inc.
//                         $inc: { likes: -1 },
//                         // Utilisation de l'operateur $pull.
//                         $pull: { usersLiked: req.body.userId }
//                     }
//                 )
//                     .then(() => res.status(201).json({ message: "Sauce like 0" }))
//                     .catch((error) => res.status(400).json({ error }));
//             }
//             // likes = -1 (dislikes = +1).
//             if (!sauce.usersDisliked.includes(req.body.userId) && req.body.likes === -1) {
//                 Sauce.updateOne(
//                     { _id: req.params.id },
//                     {
//                         $inc: { dislikes: 1 },
//                         $push: { usersDisliked: req.body.userId }
//                     }
//                 )
//                     .then(() => res.status(201).json({ message: "Sauce dislike +1" }))
//                     .catch((error) => res.status(400).json({ error }));
//             }
//             // Apres un like = -1 on met un like 0 (likes = 0, pas de vote, on enleve le dislike).
//             if (sauce.usersDisliked.includes(req.body.userId) && req.body.likes === -1) {
//                 Sauce.updateOne(
//                     { _id: req.params.id },
//                     {
//                         $inc: { dislikes: -1 },
//                         $pull: { usersDisliked: req.body.userId }
//                     }
//                 )
//                     .then(() => res.status(201).json({ message: "Sauce like 0" }))
//                     .catch((error) => res.status(400).json({ error }));
//             }
//         })
//         .catch((error) => res.status(404).json({ error }));
// };

exports.likeDislike =
 (req, res) => {
    const id = req.params.id;
    if (req.body.like === 1) {
        Sauce.updateOne(
            { _id: req.params.id },
            {
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
                $push: { usersDisliked: req.body.userId }
            })

            .then(() => res.status(200).json({ message: '+1 dislike !' }))
            .catch(error => res.status(400).json({ error }))

    } else {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id },
                        {
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