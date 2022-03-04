const User = require('../../models/user')
function UprofiloController(){
    return{
        index(req,res){
            const user = this.user
            res.render('profilo/user/utente')
        }
    }
}

module.exports = UprofiloController