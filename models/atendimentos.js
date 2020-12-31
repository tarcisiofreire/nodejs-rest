const { default: axios } = require('axios')
const moment = require('moment')
const atendimento = require('../controllers/atendimento')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, response){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:ss')
        const data =  moment(atendimento.data, "DD/MM/YYYY").format('YYYY-MM-DD HH:MM:ss')

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensangem: "A data tem de ser maior ou igual a data atual"
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: "O nome do cliente tem de ter 5 ou mais caracteres"
            }
        ]
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            response.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'insert into Atendimentos set ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro){
                    response.status(400).json(erro)
                }else{
                    response.status(201).json(atendimento)
                }
            })
        }


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
        conexao.query(sql, async (erro, resultado)=>{
            let atendimento = resultado[0]
            console.log(id + " " + resultado)
            const cpf = atendimento.cliente
            if (!resultado.length){
                atendimento = {"mensagem" : "Não há atendimentos registrados para este id"}
            }
            
            if (erro)  {
                response.status(400).json(erro)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data
                response.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss")
        }

        const sql = 'UPDATE Atendimentos SET ?  WHERE id = ?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res){
        const sql = `DELETE FROM Atendimentos where id = ${id}`

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento