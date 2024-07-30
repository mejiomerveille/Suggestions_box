const { Vote } = require('../../db/sequelize')
const auth = require('../../auth/auth');


module.exports = (app) => {
  app.get('/api/votes',auth, (req, res) => {
      Vote.findAll()
      .then(vote => {
        const message = 'La liste des Vote a bien été récupéré.'
        res.json({ message, data: vote })
      })
      .catch(error => {
        const message = `La liste des Vote n'a pas pu être récupéré. 
                         Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}