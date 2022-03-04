const PostDnd = require('../../models/postdnd')

function AprofiloController(){
    return{
        index(req, res){
            res.render('profilo/admin')
        },modProf(req, res){
            res.render('profilo/admin/modifyProfile')
        },dnd(req, res){
            res.render('profilo/admin/formDnd')
        },async sendPost(req, res){
            const { name, descrizione, tags, link_telegram } = req.body;
            if(!name || !descrizione || !tags || !link_telegram){
                req.flash('error', 'Tutti i campi sono richiesti')
                req.flash('name', name)
                req.flash('descrizione', descrizione)
                req.flash('tags', tags)
                req.flash('link_telegram',link_telegram)
                return res.redirect('/profiloAdmin/postDnD')
            }
            PostDnd.exists({ link_telegram: link_telegram }, (err, result) => {
                if(result) {
                    req.flash('error', 'E\' già presente un post con questo link.')
                    req.flash('name', name)
                    req.flash('descrizione', descrizione)
                    req.flash('tags', tags)
                    return res.redirect('/profiloAdmin/postDnD')
                }
            })
            const postDnd = new PostDnd({
                name: name,
                description: descrizione,
                tags: tags,
                linkspost: link_telegram
            })

            postDnd.save().then((postDnd) => {
                console.log('ok... reirect')
                return res.redirect('/dnd')
            }).catch( err => {
                req.flash('error', 'Qualcosa è andato storto')
            })
        },
    }
}


module.exports = AprofiloController