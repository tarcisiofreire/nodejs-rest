const query = require("../infraestrutura/database/queries")

class Atendimento {
    adiciona(atendimento){
        const sql = "INSERT INTO Atendimentos SET ?"
        return query(sql, atendimento)
    }
    lista(){
        const sql = "SELECT * FROM Atendimentos"
        return query(sql)
    }
    delata(id){
        const sql = `DELETE FROM Atendimentos where id = ${id}`
        return query(sql, id)
    }

}
module.exports = new Atendimento