// Importation d'Express.
const express = require("express");
// Importation du routeur.
const router = express.Router();
// Importation du dossier des controlleurs utilisateurs.
const userCtrl = require("../controllers/usersControllers");
// Creation des routes pour utilisateurs.
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
// Exportation du module.
module.exports = router;