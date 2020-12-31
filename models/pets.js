const conexao = require('../infraestrutura/database/conexao')
const uploadDeArquivo = require('../infraestrutura/arquivos/uploadArquivos')
class Pet {
    adiciona(pet, res){
        const query = 'INSERT INTO Pets SET ?'
        const caminhoOrigem = pet.imagem
        const nomeNovoArquivo = pet.nome 
        
        uploadDeArquivo(caminhoOrigem, nomeNovoArquivo, (erro, novoCaminho)=>{
            
            if (erro) {
                res.status(400).json({ erro })
            } else {
                const novoPet = {nome: pet.nome, imagem: novoCaminho}
                conexao.query(query, novoPet, erro =>{
                    if (erro) {
                        console.log(erro)
                        res.status(400).json(erro)
                    } else {
                        res.status(201).json(novoPet)
                    }
                })
            }
        })
    }
}

module.exports = new Pet()