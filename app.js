const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const serveIcone = require('serve-favicon');
const app = express();
const dotenv = require('dotenv');
const contactAPIRoute = require('./rootes/contactAPIRoute');
const contactRoute = require('./rootes/contactRoute');
const userRoute = require('./rootes/userRoute')

dotenv.config();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: process.env.SECRET_KEY}));
app.use(express.static(__dirname + '/public'));
app.use(serveIcone(__dirname + '/public/sticker-pirate-one-piece-logo.jpg.png'));
app.use('/api/contact', contactAPIRoute);
app.use('/contact', contactRoute);
app.use('/', userRoute);


mongoose.connect(process.env.Mongo_Connection,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.listen(8070, () => {
    console.log('Serveur démarré sur le port 8090');
});