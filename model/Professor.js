class Professor {
	constructor(id, formacao, salario, matricula) {
		this.id = id || 0
		this.formacao = formacao || ""
		this.salario = salario || 0
		this.matricula = matricula || 0
	}

	getId() {
		return this.id
	}
	setId(id) {
		this.id = id
	}
	getFormacao() {
		return this.formacao
	}
	setFormacao(formacao) {
		this.formacao = formacao
	}
	getSalario() {
		return this.salario
	}
	setSalario(salario) {
		this.salario = salario
	}
	getMatricula() {
		return this.matricula
	}
	setMatricula(matricula) {
		this.matricula = matricula
	}
}

module.exports = Professor
