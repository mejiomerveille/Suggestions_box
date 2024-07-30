const { User } = require('../../db/sequelize')

module.exports = (app) => {
  app.get('/api/user/:id', (req, res) => {
    User.findByPk(req.params.id)
      .then(user => {
        if(user === null) {
          const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }

        const message = 'Un utilisateur a bien été trouvé.'
        res.json({ message, data: user })
      })
      .catch(error => {
        console.log(error)
        const message = `L'utilisateur n'a pas pu être récupéré. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}