const { Suggestion } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.delete('/api/suggestion/:id',auth, (req, res) => {
    Suggestion.findByPk(req.params.id)
      .then(Suggestion => {        
        if(Suggestion === null) {
          const message = `La suggestion demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }

        return Suggestion.destroy({ where: { id: Suggestion.id } })
        .then(_ => {
          const message = `La suggestion avec l'identifiant n°${Suggestion.id} a bien été supprimé.`
          res.json({message, data: Suggestion })
        })
      })
      .catch(error => {
        const message = `La suggestion n'a pas pu être supprimé. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}