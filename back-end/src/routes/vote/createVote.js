const { Suggestion } = require('../../db/sequelize');
const { User } = require('../../db/sequelize');
const { Vote } = require('../../db/sequelize');
const auth = require('../../auth/auth');

// Route pour enregistrer un vote
module.exports = (app) => {
  app.post('/api/votes',auth, async (req, res) => {
    const { suggestion_id, user_id } = req.body;

    try {
      // Vérifier si l'utilisateur a déjà voté
      const existingVote = await Vote.findOne({
        where: {
          suggestion_id,
          user_id,
        },
      });

      if (existingVote) {
        return res.status(400).json({ message: 'Vous avez déjà voté' });
      }

      // Enregistrer le vote
      await Vote.create({ suggestion_id, user_id });

      // Mettre à jour le nombre de likes de la suggestion
      await Suggestion.increment('nombre_de_votes', { where: { id: suggestion_id } });

      res.json({ message: 'Vote enregistré' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Erreur lors de l'enregistrement du vote` });
    }
  });
};
