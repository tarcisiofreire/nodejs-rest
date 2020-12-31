const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/database/conexao');
const Tabelas = require('./infraestrutura/database/tabelas');
conexao.connect( erro => {
    if(erro){
        console.log(erro);
        console.error('Mysql: Banco não iniciado')
    }else{
        console.log('conectado com sucesso');

        Tabelas.init(conexao)
        const app = customExpress()
        app.listen(3000, () => console.log('Aplicação rodando'));
    }
})

