const express = require('express');
const router = express.Router();
const Contact = require('../model/contact');
const crypto = require('crypto');
const contactAPIRoute = require('../controllers/contactAPIController')


// page d'acceuil
router.get("/all", contactAPIRoute.getContacts);
// formulaire dajout
router.get("/new", contactAPIRoute.createContactGet);
router.post("/new", contactAPIRoute.createContactPost);

// trouver un contact avec son id
router.get("/:id", contactAPIRoute.findOneContact);
// mettre a joute le contact
router.put("/:id", contactAPIRoute.updateContact);
router.get("/delete/:id", contactAPIRoute.deleteContact);


// exporter le router
module.exports = router;



