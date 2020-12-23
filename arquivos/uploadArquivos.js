const fs = require('fs')

//Exemplo com buffer, processo síncrono
fs.readFile('./assets/pic.jpg', (erro, buffer) =>{
    console.log("Imagem em buffer")

    fs.writeFile('./assets/pic1buffer.jpg', buffer, (erro) => {
        console.log('imagem criada')
    })
})

//Exemplo com Stream, processo assíncrono
fs.ReadStream('./assets/pic.jpg')
    .pipe(fs.createWriteStream('./assets/pic3stream.jpg'))
    .on('finish', () => console.log('Imagem por Stream criada'))