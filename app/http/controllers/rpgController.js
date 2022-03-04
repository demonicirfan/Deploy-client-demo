const PostDnd = require('../../models/postdnd')

function rpgController(){
    return{
        async dnd(req, res) {
            const postsDnd = await PostDnd.find()
            return res.render('rpg/dnd', { postsDnd: postsDnd })
            
        }
    }
}

module.exports = rpgController