const Pessoa = require("../model/Pessoa")
let db = require("./db")
let pessoa

async function mostraPessoa() {
	let listaPessoa = new Array()

	return new Promise((resolve, reject) => {
		db.query("SELECT * FROM pessoa", (err, rows) => {
			if (err) {
				reject(err)
			} else {
				rows.forEach((row) => {
					pessoa = new Pessoa(
						row.matricula,
						row.nome,
						row.endereco,
						row.dataNascimento
					)
					listaPessoa.push(pessoa)
				})
				resolve(listaPessoa)
			}
		})
	})
}

function inserePessoa(pessoa) {
	const params = [
		pessoa.getNome(),
		pessoa.getEndereco(),
		pessoa.getDataNascimento(),
	]
	let sql =
		"INSERT INTO pessoa (nome, endereco, dataNascimento) VALUES (?, ?, ?)"

	db.query(sql, params, (err, rows) => {
		if(err){
			console.log("erro na inserção")
		}
	})
}

function deletaPessoa(id){
	let sql = "delete from faculdade.pessoa where matricula=?"

	db.query(sql, [id], (err, rows)=> {})
}

function updatePessoa(pessoa){
	const params = [
		pessoa.getNome(),
		pessoa.getEndereco(),
		pessoa.getDataNascimento(),
		pessoa.getMatricula()
	]
	let sql = "update faculdade.pessoa set nome=?, endereco=?, dataNascimento=? where matricula=?"

	db.query(sql, params, (err, rows)=> {})
}

module.exports = { mostraPessoa, inserePessoa, deletaPessoa, updatePessoa }
