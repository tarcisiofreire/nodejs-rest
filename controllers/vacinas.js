module.exports = app => {
    app.get('/vacinas', (req, res) => {
        res.send('rota alcançada')
    })
}