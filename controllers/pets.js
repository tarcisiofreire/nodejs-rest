const Pet = require('../models/pets')

module.exports = app => {
    app.post('/pets', (req, res) =>{
        const pet = req.body
        console.log(pet)
        Pet.adiciona(pet, res)
    })

}