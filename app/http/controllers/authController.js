const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require("jsonwebtoken")

function authController(){
    return{
        login(req,res) {
            res.render('auth/login')
        },
        postLogin(req, res, next){
            const { email, password } = req.body
            
            if(!email || !password){
                req.flash('error', 'Tutti i campi sono richiesti')
                req.flash('email', email)
                return res.redirect('/login')
            }
            
            passport.authenticate('local', (err, user, info) => {
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }

                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.login(user, (err) => {
                    if(err) {
                        req.flash('eror', info.message)
                        return next(err)
                    }
                    let roleUser
                    if(user.role=='admin'){
                        roleUser = true
                    }else{
                        roleUser = false
                    }
                    const accessToken= jwt.sign({id: user.id, isAdmin: roleUser}, "parolasegreta");
                    return res.redirect('/')
                })
            })(req, res, next)
        },
        register(req,res) {
            res.render('auth/register')
        },
        async postRegister(req, res){
            const { name, usurname, email, password } = req.body;
            if(!name || !email || !usurname || !password){
                req.flash('error', 'Tutti i campi sono richiesti')
                req.flash('name', name)
                req.flash('usurname', usurname)
                req.flash('email', email)
                return res.redirect('/register')
            }

            //Controllo la mail
            User.exists({ email: email }, (err, result) => {
                if(result) {
                    req.flash('error', 'E\' già presente un account con questa email.')
                    req.flash('name', name)
                    req.flash('usurname', usurname)
                    req.flash('email', email)
                    return res.redirect('/register')
                }
            })

            //crypto la password
            const hashedPasswor = await bcrypt.hash(password, 10)

            //creazione utente
            const user = new User({
                name,
                usurname,
                email,
                password: hashedPasswor
            })
            
            user.save().then((user) => {
                
                return res.redirect('/login')
            }).catch( err => {
                req.flash('error', 'Qualcosa è andato storto')
            })
        },
        logout(req, res){
            req.logout()
            return res.redirect('/')
        },
        forgot_pss(req,res){
            return res.render('profilo/forgot-password')

        },
        forgot_pss_form(req,res){
            const { email } = req.body
            if(!email || email == ''){
                req.flash('error', 'Inserire la mail dell\'account prima di continuare')
                req.flash('email', email)
                return res.redirect('/forgotpassword')
            }
            User.findOne({email}, (err, user) => {
                if(err || !user){
                    req.flash('error', 'Inserire la mail dell\'account prima di continuare')
                    req.flash('email', email)
                    return res.redirect('/forgotpassword')
                }
            })
            const JWT_SECRET = 'qualcosa di super segreto'
            var uFinde = User.find({email: email})
            console.log(uFinde)
        
            const secret = JWT_SECRET 
            const payload = 0
           
        }
    }
}

module.exports = authController