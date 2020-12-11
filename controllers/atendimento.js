const Atendimento = require('../models/atendimentos')

module.exports = app => { 
    app.get('/atendimentos', (request, response) => {
        Atendimento.lista(response);
    })

    app.get('/atendimentos/:id', (req, res)=>{
        const id = parseInt(req.params.id)
        Atendimento.item(id, res)
    })

    app.post('/atendimentos', (request, response) => {
        const atendimento = request.body
        Atendimento.adiciona(atendimento, response)
    })
}