const Contact = require("../model/contact");
const session = require('cookie-session');

module.exports.getContacts = (req, res) => {
    let userLastName = req.session.lastName
    let userFirstName = req.session.firstName
    if (typeof userFirstName != 'undefined') {

        Contact.find({},)
            .then((contacts) => {
                res.render('home', {contacts, userLastName, userFirstName});
            })
            .catch((error) => res.status(400).json(error));
    } else {
        res.redirect('/')
    }
};

module.exports.createContactGet = (req, res) => {
    let userLastName = req.session.lastName
    let userFirstName = req.session.firstName
    if (typeof userFirstName != 'undefined') {
        res.render('add-item', {userFirstName, userLastName});

    } else {
        res.redirect('/')
    }

};

module.exports.createContactPost = (req, res) => {
    let userLastName = req.session.lastName
    let userFirstName = req.session.firstName
    if (typeof userFirstName != 'undefined') {


        let lastName = req.body.lastName;
        let firstName = req.body.firstName;
        let company = req.body.company;
        let address = req.body.address;
        let phone = req.body.phone;
        let email = req.body.email
        let sector = req.body.sector;
        let erreurs = "Les champs suivant sont requis :";
        if (lastName === "" || firstName === "" || company === "" || address === "" || phone === "" || email === "" || sector === "") {

            if (lastName === "") {
                erreurs += "   Nom  ";
            }
            if (firstName === "") {
                erreurs += " Prénom  ";
            }
            if (company === "") {
                erreurs += " Société ";
            }
            if (address === "") {
                erreurs += "    Adresse  ";
            }
            if (phone === "") {
                erreurs += " Tel  ";
            }
            if (email === "") {
                erreurs += " E-Mail ";
            }
            if (sector === "") {
                erreurs += " Secteur ";
            }
            res.render("add-item", {
                erreurs: erreurs, userFirstName, userLastName
            });
        } else {
            let newContact = new Contact({lastName, firstName, company, address, phone, email, sector});
            // Enregistrement de la tâche dans la base de données
            newContact.save()
                .then((data) => {
                    res.redirect("/contact");
                })
                .catch((err) => {
                    res.status(400).json(err); // Utilisez le code de statut 400 pour indiquer une mauvaise requête en cas d'erreur
                });
        }


    } else {
        res.redirect('/')
    }

};

module.exports.findOneContact = (req, res) => {

    let userLastName = req.session.lastName
    let userFirstName = req.session.firstName
    if (typeof userFirstName != 'undefined') {
        Contact.findOne({_id: req.params.id})
            .then((contact) => {
                res.render('item', {contact, userFirstName, userLastName});
            })
            .catch((error) => res.status(400).json(error))
    } else {
        res.redirect('/')
    }


};

module.exports.updateContactGet = (req, res) => {

    let userLastName = req.session.lastName
    let userFirstName = req.session.firstName
    if (typeof userFirstName != 'undefined') {
        Contact.findOne({_id: req.params.id})
            .then((contact) => {
                res.render('edit-item', {contact, userFirstName, userLastName});
            })
            .catch((err) => res.status(400).json(err));

    } else {
        res.redirect('/')
    }

};
module.exports.updateContactPost = (req, res) => {
    let userLastName = req.session.lastName
    let userFirstName = req.session.firstName
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let company = req.body.company;
    let address = req.body.address;
    let phone = req.body.phone;
    let email = req.body.email
    let sector = req.body.sector;
    if (typeof userFirstName != 'undefined') {
        let erreurs = "Les champs suivant sont requis :";
        if (typeof userFirstName != 'undefined') {

            if (lastName === "" || firstName === "" || company === "" || address === "" || phone === "" || email === "" || sector === "") {

                if (lastName === "") {
                    erreurs += "   Nom  ";
                }
                if (firstName === "") {
                    erreurs += " Prénom  ";
                }
                if (company === "") {
                    erreurs += " Société ";
                }
                if (address === "") {
                    erreurs += "    Adresse  ";
                }
                if (phone === "") {
                    erreurs += " Tel  ";
                }
                if (email === "") {
                    erreurs += " E-Mail ";
                }
                if (sector === "") {
                    erreurs += " Secteur ";
                }
                Contact.findById(req.params.id)
                    .then((contact) => {
                        res.render("edit-item", {
                            erreurs: erreurs,
                            userFirstName: userFirstName,
                            userLastName: userLastName,
                            contact: contact  // Réaffichez les détails du contact dans le formulaire
                        });
                    })
                    .catch((err) => res.status(400).json(err));
            } else {
                req.body
                Contact.updateOne({_id: req.params.id}, req.body)
                    .then((contact) => {
                        res.redirect('/contact')
                    })
                    .catch((err) => res.status(400).json(err));
            }
        }


    } else {
        res.redirect('/')
    }

};

module.exports.deleteContact = (req, res) => {
    let userFirstName = req.session.firstName
    if (typeof userFirstName != 'undefined') {
        Contact.deleteOne({_id: req.params.id})
            .then(() => {
                res.redirect('/contact')

            })
            .catch((error) => {
                res.status(400).json(error);
            });

    } else {
        res.redirect('/')
    }
};