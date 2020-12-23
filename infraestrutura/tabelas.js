 class Tabelas {
    init(conexao){
        this.conexao = conexao
        this.criarAtendimentos()
        this.criarVacinas()
        this.criarPets()
    }

    criarAtendimentos(conexao){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20) NOT NULL, servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, data datetime NOT NULL, dataCriacao datetime NOT NULL, PRIMARY KEY (id))'
        this.conexao.query(sql, erro => {
            if(erro){
                console.log('Ocorreu algum erro com a criação da tabela atendimentos')
            }else{
                console.log('Tabela Atendimentos criada com sucesso ou já criada.')
            }
        });

    }
    criarVacinas(conexao){
        const sql = 'create table if not exists Vacinas (id int NOT NULL AUTO_INCREMENT, codigo int NOT NULL, nome varchar(50) NOT NULL, PRIMARY KEY(id))'
        this.conexao.query(sql, erro => {
            if(erro){
                console.error(erro)
            }else{
                console.log('Tabela vacinas criada com sucesso ou já criada anteriomente')
            }
        })
    }
    criarPets(conexao){
        const sql = 'create table IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50), imagem varchar(200), PRIMARY KEY(id))'

        this.conexao.query(sql, erro => {
            if (erro){
                console.error(erro)
            } else {
                console.log('Tabela pets criada com sucesso ou existente na base de dados.')
            }
        })
    }
 }
 module.exports = new Tabelas