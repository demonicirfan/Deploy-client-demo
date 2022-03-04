const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postdnd = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    tags: {type: String, required: true},
    linkspost: {type: String, required: true}
})

//il secondo parametro è lo schema
//il primo è il nome della tabella che si trova nel database, il cui nome deve essere al plurale inglese
module.exports = mongoose.model('PostDnd', postdnd)