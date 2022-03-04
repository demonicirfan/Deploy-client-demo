const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const rpgController = require('../app/http/controllers/rpgController')
const AprofiloController = require('../app/http/controllers/AprofiloController')
const UprofiloController = require('../app/http/controllers/UprofiloController')
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')

function initRoutes(app){

    //GET redirect base
    app.get('/', homeController().index)
    app.get('/dnd', rpgController().dnd)
    app.get('/login', guest, authController().login)
    app.get('/register', guest, authController().register)
    app.get('/forgotpassword', guest, authController().forgot_pss)

    //GET redirect Admin
    app.get('/profiloAdmin', auth, AprofiloController().index)
    app.get('/profiloAdmin/modificaProfilo', auth, AprofiloController().modProf)
    app.get('/profiloAdmin/postDnD', auth, AprofiloController().dnd)
    

    //GET redirect profilo utente
    app.get('/profiloUtente', auth, UprofiloController().index)

    //POST redirect base
    app.post('/register', authController().postRegister)
    app.post('/login', authController().postLogin)
    app.post('/logout', authController().logout)
    app.post('/forgotpassword', authController().forgot_pss_form)
    app.post('/', homeController().invioMail)

    //POST redierct Admin
    app.post('/profiloAdmin/postDnD', auth, AprofiloController().sendPost)

    //POST redirect user

    
    
}

module.exports = initRoutes