const nodemailer = require("nodemailer")

function homeController(){
    return{
        index(req,res) {
            res.render('home')
        },
        invioMail(req,res){
            console.log(req.body)
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: 'worldsinnweb@gmail.com',
                    pass: 'Cane.bau0'
                }

            })

            var mailOptions = {
                from: req.body.email,
                to: 'worldsinnweb@gmail.com',
                subject: `Messaggio da ${req.body.name}::${req.body.email}: ${req.body.oggetto}`,
                text: req.body.message
            }

            transporter.sendMail(mailOptions, (error, info)=>{
                if(error){
                    console.log(error);
                    res.send('error');
                }else{
                    console.log('Email sent: '+ info.response);
                    res.send('success')
                }
            })
        }
    }
}

module.exports = homeController