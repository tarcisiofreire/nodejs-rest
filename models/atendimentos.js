const { default: axios } = require('axios')
const moment = require('moment')
const atendimento = require('../controllers/atendimento')
const conexao = require('../infraestrutura/database/conexao')
const repositorio = require('../repositorios/atendimentos')
class Atendimento {
    constructor(){
        this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = ({tamanho}) => tamanho >= 5
        this.valida = parametros => this.validacoes.filter(campo => {
            const {nome} = campo
            const parametro = parametros[nome]
            return !campo.valido(parametro)
        })
        
        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensangem: "A data tem de ser maior ou igual a data atual"
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: "O nome do cliente tem de ter 5 ou mais caracteres"
            }
        ]
        
    }
    adiciona(atendimento, response){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:ss')
        const data =  moment(atendimento.data, "DD/MM/YYYY").format('YYYY-MM-DD HH:MM:ss')
        
        const parametros = {
            data: {data, dataCriacao},
            cliente: {'tamanho': atendimento.cliente.length }
        }
        
        const erros = this.valida(parametros)
        const existemErros = erros.length

        if(existemErros){
            return new Promise((resolve, reject) =>{
                reject(erros)
            })
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            
            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId
                    //Para visualizar as propriedade de result mysql:
                    //console.log(resultados)
                    return {...atendimento, id}
                }
            )

        }


    }

    lista(){
        return repositorio.lista()
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

    deleta(id){
        return repositorio.delata(id)
    }
}

module.exports = new Atendimento