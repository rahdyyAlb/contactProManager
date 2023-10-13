const express = require('express');
const router = express.Router();
const contact = require('../model/contact');
const bodyParser = require('body-parser');
const contactController = require("../controllers/contactController");


// page d'acceuil
router.get("/", contactController.getContacts);
// formulaire de création
router.get("/new", contactController.createContactGet);
router.post("/new", contactController.createContactPost);
// trouver un contact avec son id
router.get("/:id", contactController.findOneContact);
// mettre a joute le contact
router.get("/edit/:id", contactController.updateContactGet);
router.post("/edit/:id", contactController.updateContactPost);
// suppression
router.get("/delete/:id", contactController.deleteContact);

// export des routes contenu dans le router
module.exports = router;