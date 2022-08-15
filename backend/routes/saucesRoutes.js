const express = require('express');
// Creation d'un routeur avec la methode Router() d'Express.
const router = express.Router();
// Importation du fichier stuff dans controllers.
const sauceCtrl = require("../controllers/saucesControllers")

router.post("/", sauceCtrl.createSauce); 
router.get('/:id', sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce);
router.put('/:id', sauceCtrl.getOneSauce);
router.get('/', sauceCtrl.getAllSauce);

module.exports = router;