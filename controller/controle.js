const Pessoa = require("../model/Pessoa")
const Aluno = require("../model/Aluno")
const Professor = require("../model/Professor")

const format = require("../utils/formats")
let db = require("./db")
let pessoa

// ! ----- Pessoa -----
async function listaPessoas() {
	let listaPessoa = new Array()

	return new Promise((resolve, reject) => {
		db.query("SELECT * FROM Pessoa", (err, rows) => {
			if (err) {
				reject(err)
			} else {
				rows.forEach((row) => {
					pessoa = new Pessoa(
						row.matricula,
						row.nome,
						row.endereco,
						format.formatDate(row.data_nascimento)
					)
					listaPessoa.push(pessoa)
				})
				resolve(listaPessoa)
			}
		})
	})
}

async function getPessoa(id) {
	const params = [id]
	let sql = "SELECT * FROM Pessoa WHERE matricula = ?"

	return new Promise((resolve, reject) => {
		db.query(sql, params, (err, rows) => {
			if (err) {
				reject(err)
			} else {
				resolve(rows)
			}
		})
	})
}

function inserePessoa(pessoa) {
	const params = [
		pessoa.getMatricula(),
		pessoa.getNome(),
		pessoa.getEndereco(),
		pessoa.getDataNascimento(),
	]
	let sql =
		"INSERT INTO pessoa (matricula, nome, endereco, data_nascimento) VALUES (?, ?, ?, ?)"

	return new Promise((resolve, reject) => {
		db.query(sql, params, (err, rows) => {
			if (err) {
				console.log("erro na inserção")
				if (err.errno == 1062) {
					reject(
						"Não é possível inserir uma pessoa com a mesma matrícula"
					)
				}
			} else {
				resolve("Pessoa inserida com sucesso")
			}
		})
	})
}

function deletaPessoa(id) {
	let sql = "delete from faculdade.pessoa where matricula=?"

	return new Promise((resolve, reject) => {
		db.query(sql, [id], (err, rows) => {
			if (err) {
				console.log("erro no delete")
				if (err.errno == 1451) {
					reject(
						"Não é possível deletar uma pessoa que possui vínculo com outra tabela"
					)
				}
			}
		})
	})
}

function updatePessoa(pessoa) {
	const params = [
		pessoa.getNome(),
		pessoa.getEndereco(),
		pessoa.getDataNascimento(),
		pessoa.getMatricula(),
	]
	let sql =
		"update faculdade.pessoa set nome=?, endereco=?, data_nascimento=? where matricula=?"

	db.query(sql, params, (err, rows) => {
		if (err) {
			console.log("erro no update")
		}
	})
}

// ! ------ Aluno ------
async function listaAlunos() {
	let lista = new Array()

	return new Promise((resolve, reject) => {
		db.query("SELECT * FROM Aluno", (err, rows) => {
			if (err) {
				reject(err)
			} else {
				rows.forEach((row) => {
					pessoa = new Aluno(row.id, row.curso, row.matricula)
					lista.push(pessoa)
				})
				resolve(lista)
			}
		})
	})
}

async function getAluno(id) {
	const params = [id]
	let sql = "SELECT * FROM Aluno WHERE id = ?"

	return new Promise((resolve, reject) => {
		db.query(sql, params, (err, rows) => {
			if (err) {
				reject(err)
			} else {
				resolve(rows)
			}
		})
	})
}

function insereAluno(aluno) {
	const params = [aluno.getCurso(), aluno.getMatricula()]
	let sql = "INSERT INTO aluno (curso, matricula) VALUES (?, ?)"

	db.query(sql, params, (err, rows) => {
		if (err) {
			console.log("erro na inserção")
		}
	})
}

function deletaAluno(id) {
	let sql = "delete from faculdade.aluno where id=?"

	db.query(sql, [id], (err, rows) => {
		if (err) {
			console.log("erro no delete")
		}
	})
}

function updateAluno(aluno) {
	const params = [aluno.getCurso(), aluno.getMatricula(), aluno.getId()]
	let sql = "update faculdade.aluno set curso=?, matricula=? where id=?"

	db.query(sql, params, (err, rows) => {
		if (err) {
			console.log("erro no update")
			throw err
		}
	})
}

// ! ------ Professor ------
async function listaProfessores() {
	let lista = new Array()

	return new Promise((resolve, reject) => {
		db.query("SELECT * FROM Professor", (err, rows) => {
			if (err) {
				reject(err)
			} else {
				rows.forEach((row) => {
					pessoa = new Professor(
						row.id,
						row.formacao,
						row.salario.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
						}),
						row.matricula
					)
					lista.push(pessoa)
				})
				resolve(lista)
			}
		})
	})
}

async function getProfessor(id) {
	const params = [id]
	let sql = "SELECT * FROM Professor WHERE id = ?"

	return new Promise((resolve, reject) => {
		db.query(sql, params, (err, rows) => {
			if (err) {
				reject(err)
			} else {
				resolve(rows)
			}
		})
	})
}

function insereProfessor(professor) {
	const params = [
		professor.getFormacao(),
		professor.getSalario(),
		professor.getMatricula(),
	]
	let sql =
		"INSERT INTO professor (formacao, salario, matricula) VALUES (?, ?, ?)"

	db.query(sql, params, (err, rows) => {
		if (err) {
			console.log("erro na inserção")
		}
	})
}

function deletaProfessor(id) {
	let sql = "delete from faculdade.professor where id=?"

	db.query(sql, [id], (err, rows) => {
		if (err) {
			console.log("erro no delete")
		}
	})
}

function updateProfessor(aluno) {
	const params = [
		aluno.getFormacao(),
		aluno.getSalario(),
		aluno.getMatricula(),
		aluno.getId(),
	]
	let sql =
		"update faculdade.professor set formacao=?, salario=?, matricula=? where id=?"

	db.query(sql, params, (err, rows) => {
		if (err) {
			console.log("erro no update")
			throw err
		}
	})
}

module.exports = {
	// ! Pessoa
	listaPessoas,
	getPessoa,
	inserePessoa,
	deletaPessoa,
	updatePessoa,
	// ! Aluno
	listaAlunos,
	insereAluno,
	deletaAluno,
	getAluno,
	updateAluno,
	// ! Professor
	listaProfessores,
	getProfessor,
	insereProfessor,
	deletaProfessor,
	updateProfessor,
}
