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
        return Atendimento.adiciona(atendimento)
            .then( atendimento => {response.status(201).json(atendimento)})
            .catch( erros => (response.status(400).json(erros)))
    })
    
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.deleta(id, res)
    })
}