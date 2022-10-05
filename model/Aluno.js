class Aluno {
	constructor(id, curso, matricula) {
		this.id = id || 0
		this.curso = curso || ""
		this.matricula = matricula || 0
	}

	getId() {
		return this.id
	}
	setId(id) {
		this.id = id
	}
	getCurso() {
		return this.curso
	}
	setCurso(curso) {
		this.curso = curso
	}
	getMatricula() {
		return this.matricula
	}
	setMatricula(matricula) {
		this.matricula = matricula
	}
}

module.exports = Aluno
