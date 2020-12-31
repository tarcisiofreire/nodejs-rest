const fs = require('fs')
const path = require('path')

//Exemplo com buffer, processo síncrono
// fs.readFile('./assets/pic.jpg', (erro, buffer) =>{
//     console.log("Imagem em buffer")

//     fs.writeFile('./assets/pic1buffer.jpg', buffer, (erro) => {
//         console.log('imagem criada')
//     })
// })

//Exemplo com Stream, processo assíncrono
// fs.ReadStream('./assets/pic.jpg')
//     .pipe(fs.createWriteStream('./assets/pic3stream.jpg'))
//     .on('finish', () => console.log('Imagem por Stream criada'))

module.exports = (caminho, nomeArquivo, callbackImagemCriada) => 
{
    const tiposValidos = ['jpg', 'jpeg', 'png']
    const tipo = path.extname(caminho)
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1
    
    if (tipoEhValido) {
        const novoCaminho = `./assets/imagens/${nomeArquivo}${tipo}`
        
        fs.ReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImagemCriada(false, novoCaminho))
            
    } else {
        const erro = "Tipo é inválido"
        console.log('Erro! Tipo inválido')
        callbackImagemCriada(erro)
    }

}