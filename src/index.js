const express = require('express');
const db = require('./database');
const cors = require('cors');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();
module.exports = app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', routes);

app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Route not found',
  });
  next();
});

app.listen(process.env.PORT || 4000, () => console.log('Server listening'));

// Initialisation de la base avec les deux tables nécessaires (à garder)
db.init();
// // exemple de requete sql à supprimer
// db.all('select * from city').then((rows) => {
//   console.table(rows);
// });
// dans le cas où le front est fait en js natif, voici une ligne de commande à ajouter pour servir le front à partir du projet node
// si vous faîtes du VueJS ou du React ce n'est pas nécessaire
// dans ce cas il n'est pas nécessaire d'utiliser la partie cors (ligne 6 à 8)
//app.use('/', express.static('../../front/'));
