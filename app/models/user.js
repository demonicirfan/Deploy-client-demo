const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = new Schema({
    name: {type: String, required: true},
    usurname: {type: String, required: true},
    phone: {type: String, required: false},
    city: {type: String, required: false},
    provincia: {type: String, required: false},
    usurname: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'}
}, { timestamps: true })

//il secondo parametro è lo schema
//il primo è il nome della tabella che si trova nel database, il cui nome deve essere al plurale inglese
module.exports = mongoose.model('User', user)