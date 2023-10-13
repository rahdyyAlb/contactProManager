const Contact = require("../model/contact");

module.exports.getContacts = (req, res) => {
    Contact.find()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error))
};

module.exports.createContactGet = (req, res) => {
    res.render('add-item');
};

module.exports.createContactPost = (req, res) => {
    req.body

    let contact = new Contact(req.body);
    contact.save()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));

};

module.exports.findOneContact = (req, res) => {
    Contact.findOne({_id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error))
};

module.exports.updateContact = (req, res) => {
    req.body
// met à jour le contact
    Contact.updateOne({_id: req.params.id}, req.body)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
};


module.exports.deleteContact = (req, res) => {

    Contact.deleteOne({_id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error))
};