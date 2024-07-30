const { Suggestion } = require('../../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../../auth/auth')

const capitalize = (str) => str.charAt(0).toUpperCase() + str.substring(1)

module.exports = (app) => {
  app.get('/api/suggestion',auth, (req, res) => {
    if(req.query.content) {
      const content = req.query.content
      const limit = parseInt(req.query.limit) || 5

      if(content.length < 2) {
        const message = `Le terme de recherche doit contenir au minimum 2 caractères.`
        return res.status(400).json({ message })        
      }

      return Suggestion.findAndCountAll({ 
        where: { 
          content: {
            [Op.or]: {
              [Op.like]: `%${content}%`,
              [Op.startsWith]: capitalize(content)
            }
          }
        },
        order: ['content'],
        limit: limit
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} qui correspondent au terme de recherche ${content}.`
        return res.json({ message, data: rows })
      })
    } 
    else {
      Suggestion.findAll({ order: ['content'] })
      .then(suggestions => {
        const message = 'La liste des suggestions a bien été récupéré.'
        res.json({ message, data: suggestions })
      })
      .catch(error => {
        const message = `La liste des suggestions n'a pas pu être récupéré. 
                         Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    }
  })
}