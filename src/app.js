require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
var unirest = require("unirest");
const jsonBodyParser= express.json()



const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

 app.get('/', jsonBodyParser,(req, res, next) => {
console.log('aqui')
  const text = req.query.text
  unirest.get( "https://translated-mymemory---translation-memory.p.rapidapi.com/api/get")
  .query({
    "mt": "1",
    "onlyprivate": "0",
    "de": "a@b.c",
    "langpair": "en|es",
    "q": text
  })
  .headers({
    "x-rapidapi-host": "translated-mymemory---translation-memory.p.rapidapi.com",
    "x-rapidapi-key": "b5f70bd1c9msh133a4bbdfb3c433p1463c0jsn8429fb0c932c"
  })
  .end((response)=>{
    if (res.error) throw new Error(res.error);
    console.log(res.body)
    return res.status(200).send(response)
  })
})




 app.use(function errorHandler(error, req, res, next) {
   let response
   if (NODE_ENV === 'production') {
     response = { error: { message: 'server error' } }
   } else {
     console.error(error)
     response = { message: error.message, error }
   }
   res.status(500).json(response)
 })
     

module.exports = app