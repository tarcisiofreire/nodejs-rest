const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, response){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:ss')
        const data =  moment(atendimento.data, "DD/MM/YYYY").format('YYYY-MM-DD HH:MM:ss')
        const atendimentoDatado = {...atendimento, dataCriacao, data}
        const sql = 'insert into Atendimentos set ?'

        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if(erro){
                response.status(400).json(erro)
            }else{
                response.status(201).json(resultados)
            }
        })
    }

    lista(response){
        const sql = 'select * from Atendimentos'

        conexao.query(sql, (erro, resultados) =>{
            if (erro){
                response.status(400).json(erro)
            }else(
                response.status(200).json(resultados)
            )
        })
    }
    item(id, response){
        //const sql = 'SELECT * FROM Atendimentos WHERE id = ?' Funciona
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`
        conexao.query(sql, (erro, resultado)=>{
            const atendimento = resultado[0]
            if(erro){
                response.status(400).json(erro)
            }else(
                response.status(200).json(atendimento)
            )
        })
    }
}

module.exports = new Atendimento