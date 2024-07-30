const {Sequelize,DataTypes} = require('sequelize')
const SuggestionsModel = require('../models/suggestion.js')
const Suggestions = require('./mock-suggestions.js')
const UserModel = require('../models/user.js')
const VoteModel = require('../models/vote.js')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize(
    'suggestion-box',
    'root',
    '',
    {
        host:'localhost',
        dialect:'mariadb',
        dialectOptions:{
            timezone: 'Etc/GMT-2'
        },
        logging:false
    }
)

const Suggestion = SuggestionsModel(sequelize,DataTypes)
const User = UserModel(sequelize,DataTypes)
const Vote = VoteModel(sequelize,DataTypes)

Suggestion.hasMany(Vote, { foreignKey: 'suggestion_id' });
Vote.belongsTo(Suggestion, { foreignKey: 'suggestion_id' });
User.hasMany(Vote, { foreignKey: 'user_id' });
Vote.belongsTo(User, { foreignKey: 'user_id' });


const initDB = () =>{
    return sequelize.sync({force:false}).then(_=>{

    //     bcrypt.hash('merveille',10)
    //     .then(hash =>
    //         User.create({
    //             username: 'Merveille',
    //             email: 'merveillecathy654@gmail.com',
    //             password: hash,
    //             role: 'admin'
    //         })
    // ).then(user => console.log(user.toJSON()))

    // Suggestions.map(suggestion => {
    //     Suggestion.create({
    //         content: suggestion.content,
    //         status: suggestion.status,
    //         // user_id: suggestion.user_id,
    //     }).then(suggestion =>console.log(suggestion.toJSON()))
    // })

        console.log('la base de donnees "suggestion-box a bien ete synchronise')
    })
}

module.exports ={
    initDB, Suggestion,User,Vote
}