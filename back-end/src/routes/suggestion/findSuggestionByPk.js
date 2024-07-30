const { Suggestion } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.get('/api/suggestion/:id',auth, (req, res) => {
    Suggestion.findByPk(req.params.id)
      .then(suggestion => {
        if(suggestion === null) {
          const message = `La suggestion demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }

        const message = 'Une suggestion a bien été trouvé.'
        res.json({ message, data: suggestion })
      })
      .catch(error => {
        console.log(error)
        const message = `La suggestion n'a pas pu être récupéré. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}