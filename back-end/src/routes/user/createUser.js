const { User } = require('../../db/sequelize');
const bcrypt = require('bcrypt');
const { ValidationError, UniqueConstraintError } = require('sequelize');

module.exports = (app) => {
  app.post('/api/user/create', (req, res) => {
    // Vérifiez si tous les champs obligatoires sont présents
    if (!req.body.username || !req.body.password || !req.body.role) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    // Hachage du mot de passe
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        // Créez l'utilisateur avec le mot de passe haché
        return User.create({
          username: req.body.username,
          email: req.body.email, 
          password: hash,
          role: req.body.role, 
        });
      })
      .then(user => {
        const message = `L'utilisateur ${req.body.username} a bien été créé.`;
        res.json({ message, data: user });
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà pris.', data: error });
        }
        const message = `L'utilisateur n'a pas pu être ajouté. Réessayez dans quelques instants.`;
        console.log(error);
        res.status(500).json({ message, data: error });
      });
  });
};