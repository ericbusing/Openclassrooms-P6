// Importation de mongoose.
const mongoose = require("mongoose");
// Creation du modele avec un objet.
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String },
    heat: { type: Number, required: true },
    // Systeme de like/dislike.
    likes: { type: Number, defaut: 0 },
    dislikes: { type: Number, defaut: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
});
// Exportation du module.
module.exports = mongoose.model("sauce", sauceSchema);