const User = require("../model/user");
const crypto = require("crypto")


module.exports.home = (req, res) => {

    req.session.test = "test"
    res.render('connection');
};

module.exports.getUser = (req, res) => {
    User.find()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error))
};


module.exports.createUserGet = (req, res) => {
    res.render('add-user');
};

module.exports.createUserPost = (req, res) => {

    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let email = req.body.email
    let password = crypto.createHmac("sha512",
        process.env.SECRET_KEY)
        .update(req.body.password)
        .digest("base64");
    let newUser = new User({lastName, firstName, email, password});
    newUser.save()
        .then((data) => {
            res.redirect("/");
        })
        .catch((err) => {
            res.status(400).json(err); // Utilisez le code de statut 400 pour indiquer une mauvaise requête en cas d'erreur
        });
};

module.exports.connection = (req, res) => {

    //recupere les données du formulaire
    let email = req.body.email
    let password = crypto.createHmac("sha512",
        process.env.SECRET_KEY)
        .update(req.body.password)
        .digest("base64");


// si le email ou le mot de passe ne sont pas renseignés
    if (email == "" || password == "") {
// réaffiche la vue render avec le message d'erreurs
        let erreurs = "Les champs suivant sont requis :";
        if (email === "") {
            erreurs += "   email , ";
        }
        if (password === "") {
            erreurs += " password , ";
        }

        res.render("connection", {
            erreurs: erreurs
        });
    } else {
        User.findOne({email: email})
            .then((user) => {
                let passwordBDD = user.password;
                if (password === passwordBDD) {
                    req.session.user = user;
                    req.session.email = user.email;
                    req.session.lastName = user.lastName;
                    req.session.firstName = user.firstName;
                    res.redirect("/contact");
                } else {
                    res.render("connection", {
                        erreurs: "Login ou mot de passe incorrect"
                    })
                }
            })
            .catch((err) => res.status(400).json(err));
    }
};
