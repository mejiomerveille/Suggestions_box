const { Suggestion } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.put('/api/suggestions/update/:id',auth, (req, res) => {
    const id = req.params.id
    Suggestion.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Suggestion.findByPk(id).then(Suggestion => {
        if(Suggestion === null) {
          const message = `La suggestion demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }

        const message = `La suggestion ${Suggestion.id} a bien été modifié.`
        res.json({message, data: Suggestion })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: 'error.message', data: error });
      }
      const message = `La suggestion n'a pas pu être modifié. Réessayez dans quelques instants.`
      console.log(error);
      res.status(500).json({ message, data: error })
    })
  })
}