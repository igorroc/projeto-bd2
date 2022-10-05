const express = require("express")
const app = express()
const port = 3000
const controle = require("./controller/controle")
const Pessoa = require("./model/Pessoa")
const Aluno = require("./model/Aluno")
const Professor = require("./model/Professor")

app.use(express.urlencoded({ extended: true }))

app.set("engine ejs", "ejs")

app.get("/", async (req, res) => {
	res.render("index.ejs")
})

// ! ----- Pessoa -----

app.get("/select/pessoa", async (req, res) => {
	let dados = new Array()
	dados = await controle.listaPessoas()
	res.render("pessoa/select.ejs", { dados })
})

app.get("/insert/pessoa", function (req, res) {
	res.render("pessoa/insert.ejs")
})

app.post("/insert/pessoa", async function (req, res) {
	const pessoa = new Pessoa(
		req.body.matricula,
		req.body.nome,
		req.body.endereco,
		req.body.data_nascimento
	)
	let resultado = "pessoa inserida com sucesso"

	try {
		await controle.inserePessoa(pessoa)
	} catch (err) {
		resultado = err
	}

	console.log(resultado)

	res.redirect("/select/pessoa")
})

app.get("/delete/pessoa/:id", async function (req, res) {
	try {
		await controle.deletaPessoa(req.params.id)
	} catch (error) {
		console.log(error)
	}

	res.redirect("/select/pessoa")
})

app.get("/edit/pessoa/:id", async function (req, res) {
	const pessoa = await controle.getPessoa(req.params.id)
	res.render("pessoa/edit.ejs", { pessoa: pessoa[0] })
})

app.post("/edit/pessoa/:id", function (req, res) {
	const pessoa = new Pessoa(
		req.params.id,
		req.body.nome,
		req.body.endereco,
		req.body.dataNascimento
	)
	controle.updatePessoa(pessoa)
	res.redirect("/select/pessoa")
})

// ! ----- Aluno -----
app.get("/select/aluno", async (req, res) => {
	let dados = new Array()
	dados = await controle.listaAlunos()
	res.render("aluno/select.ejs", { dados })
})

app.get("/insert/aluno", async function (req, res) {
	let dados = new Array()
	dados = await controle.listaPessoas()

	res.render("aluno/insert.ejs", { dados })
})

app.post("/insert/aluno", function (req, res) {
	const pessoa = new Aluno(req.body.id, req.body.curso, req.body.matricula)
	controle.insereAluno(pessoa)
	console.log("aluno inserido com sucesso")
	res.redirect("/select/aluno")
})

app.get("/delete/aluno/:id", function (req, res) {
	controle.deletaAluno(req.params.id)
	res.redirect("/select/aluno")
})

app.get("/edit/aluno/:id", async function (req, res) {
	const aluno = await controle.getAluno(req.params.id)
	let dados = new Array()
	dados = await controle.listaPessoas()

	res.render("aluno/edit.ejs", { aluno: aluno[0], dados })
})

app.post("/edit/aluno/:id", function (req, res) {
	const aluno = new Aluno(req.params.id, req.body.curso, req.body.matricula)
	controle.updateAluno(aluno)
	res.redirect("/select/aluno")
})

// ! ----- Professor -----
app.get("/select/professor", async (req, res) => {
	let dados = new Array()
	dados = await controle.listaProfessores()
	res.render("professor/select.ejs", { dados })
})

app.get("/insert/professor", async function (req, res) {
	let dados = new Array()
	dados = await controle.listaPessoas()

	res.render("professor/insert.ejs", { dados })
})

app.post("/insert/professor", function (req, res) {
	const pessoa = new Professor(
		req.body.id,
		req.body.formacao,
		req.body.salario,
		req.body.matricula
	)
	controle.insereProfessor(pessoa)
	console.log("professor inserido com sucesso")
	res.redirect("/select/professor")
})

app.get("/delete/professor/:id", function (req, res) {
	controle.deletaProfessor(req.params.id)
	res.redirect("/select/professor")
})

app.get("/edit/professor/:id", async function (req, res) {
	const professor = await controle.getProfessor(req.params.id)
	let dados = new Array()
	dados = await controle.listaPessoas()

	res.render("professor/edit.ejs", { professor: professor[0], dados })
})

app.post("/edit/professor/:id", function (req, res) {
	const professor = new Professor(
		req.params.id,
		req.body.formacao,
		req.body.salario,
		req.body.matricula
	)
	controle.updateProfessor(professor)
	res.redirect("/select/professor")
})
app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`)
})
