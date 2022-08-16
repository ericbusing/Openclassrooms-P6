const express = require('express');
// Creation d'un routeur avec la methode Router() d'Express.
const router = express.Router();
// Importation du middleware.
const auth = require("../middleware/auth");
// Importation du fichier sauces dans controllers.
const sauceCtrl = require("../controllers/saucesControllers")
// Importation du multer.
const multer = require("../middleware/multer-config");

// Ajout de auth comme argument avant les gestionnaires de routes pour les proteger.
router.post("/", auth, multer, sauceCtrl.createSauce); 
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauce);

module.exports = router;