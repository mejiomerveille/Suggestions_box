const { User } = require('../../db/sequelize')

module.exports = (app) => {
  app.delete('/api/user/:id', (req, res) => {
    User.findByPk(req.params.id)
      .then(user => {        
        if(user === null) {
          const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }

        return user.destroy({ where: { id: user.id } })
        .then(_ => {
          const message = `L'utilisateur avec l'identifiant n°${user.id} a bien été supprimé.`
          res.json({message, data: user })
        })
      })
      .catch(error => {
        const message = `L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}