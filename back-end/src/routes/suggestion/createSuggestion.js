const { Suggestion } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.post('/api/suggestion/create',auth, (req, res) => {
      // Vérifiez si tous les champs obligatoires sont présents
      if (!req.body.content) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
      }
  
      Suggestion.create({
        content: req.body.content,
        user_id:  req.userId, // Assurez-vous que l'ID de l'utilisateur est disponible
        // print(user_id)
      })
      .then(Suggestion => {
        const message = `La suggestion ${req.body.content} a bien été crée.`
        res.json({ message, data: Suggestion })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: 'error.message', data: error });
        }
        const message = `La suggestion n'a pas pu être ajouté. Réessayez dans quelques instants.`
        console.log(error)
        res.status(500).json({ message, data: error })
      })
  })
}