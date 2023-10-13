const express = require('express');
const router = express.Router();
const contact = require('../model/contact');
const bodyParser = require('body-parser');
const usercontroller = require("../controllers/userController");


// page d'acceuil
router.get("/", usercontroller.home);
//connection
router.post('/connection', usercontroller.connection)

// formulaire de création
router.get('/user/new', usercontroller.createUserGet);
router.post('/user/new', usercontroller.createUserPost);

router.get("/user/all", usercontroller.getUser);


// export des routes contenu dans le router
module.exports = router;