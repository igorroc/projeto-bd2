class Pessoa {
	constructor(matricula, nome, endereco, data_nascimento) {
		this.matricula = matricula || 0
		this.nome = nome || ""
		this.endereco = endereco || ""
		this.data_nascimento = data_nascimento || new Date()
	}

	getMatricula() {
		return this.matricula
	}
	setMatricula(matricula) {
		this.matricula = matricula
	}
	getNome() {
		return this.nome
	}
	setNome(nome) {
		this.nome = nome
	}
	getEndereco() {
		return this.endereco
	}
	setEndereco(endereco) {
		this.endereco = endereco
	}
	getDataNascimento() {
		return this.data_nascimento
	}
	setDataNascimento(data_nascimento) {
		this.data_nascimento = data_nascimento
	}
}

module.exports = Pessoa
