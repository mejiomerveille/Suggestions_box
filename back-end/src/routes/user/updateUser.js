const { User } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')

module.exports = (app) => {
  app.put('/api/user/update/:id', (req, res) => {
    const id = req.params.id
    User.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return User.findByPk(id).then(user => {
        if(user === null) {
          const message = `L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }

        const message = `L'utilisateur ${User.id} a bien été modifié.`
        res.json({message, data: User })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: 'error.message', data: error });
      }
      const message = `L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants.`
      console.log(error);
      res.status(500).json({ message, data: error })
    })
  })
}