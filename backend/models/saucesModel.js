const mongoose = require("mongoose");
// Creation du modele avec un objet.
const sauceSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model("sauce", sauceSchema);