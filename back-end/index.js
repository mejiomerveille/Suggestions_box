const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const bodyParser = require('body-parser')
// const favicon =require('serve-favicon')
const sequelize=require('./src/db/sequelize')


const app = express()
const port= 5000

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };
  
app 
// .use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())
.use(cors(corsOptions));

sequelize.initDB()

// ici , nous placerons nos futurs points de terminaison.
require('./src/routes/suggestion/findAllSuggestions')(app)
require('./src/routes/suggestion/findSuggestionByPk')(app)
require('./src/routes/suggestion/createSuggestion')(app)
require('./src/routes/suggestion/updateSuggestion')(app)
require('./src/routes/suggestion/deleteSuggestion')(app)

require('./src/routes/user/createUser')(app)
require('./src/routes/user/login')(app)
require('./src/routes/user/findAllUser')(app)
require('./src/routes/user/findUserByPk')(app)
require('./src/routes/user/deleteUser')(app)
require('./src/routes/user/updateUser')(app)

require('./src/routes/vote/createVote')(app)
require('./src/routes/vote/findAllVote')(app)

// on ajoute la gestion des erreurs
app.use(({res}) =>{
    const message = 'impossible de trouver la ressource demandee ! Vous pouvez essayer une autre URL'
    res.status(404).json({message}) 
})
app.get('/',(req,res)=>res.send('Hello merveille'))
app.listen(port, ()=>console.log(`Notre application Node est demaree sur : http://localhost:${port}`))