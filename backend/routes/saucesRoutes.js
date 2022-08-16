const express = require('express');
// Creation d'un routeur avec la methode Router() d'Express.
const router = express.Router();
// Importation du middleware.
const auth = require("auth");
// Importation du fichier stuff dans controllers.
const sauceCtrl = require("../controllers/saucesControllers")

router.post("/", auth, sauceCtrl.createSauce); 
router.get('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.put('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauce);

module.exports = router;