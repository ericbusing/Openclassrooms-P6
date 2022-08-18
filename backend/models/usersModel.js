// Importation de mongoose.Mongoose.
const mongoose = require("mongoose");
// Importation du package mongoose unique validator.
const uniqueValidator = require("mongoose-unique-validator");
// Creation d'un modele avec un objet.
const userSchema = mongoose.Schema({
    // Utilisation de "unique" pour garantir l'unicité de l'email.
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);
// Exportation du module.
module.exports= mongoose.model("User", userSchema);