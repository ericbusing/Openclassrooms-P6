const express = require('express');
// Creation d'un routeur avec la methode Router() d'Express.
const router = express.Router();
// Importation du fichier stuff dans controllers.
const stuffCtrl = require("../controllers/stuff")

router.post("/", stuffCtrl.createThing); 
router.get('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);
router.put('/:id', stuffCtrl.getOnThing);
router.get('/', stuffCtrl.getAllThing);

module.exports = router;