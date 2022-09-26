const express = require("express")
const app = express()
const port = 3000
const controle = require("./controller/controle")
const Pessoa = require("./model/Pessoa")

app.use(express.urlencoded({extended: true}))

app.set("engine ejs", "ejs")

app.get("/", async (req, res) => {
	let dados = new Array();
	dados = await controle.mostraPessoa();

	res.render("index.ejs", { dados })
})

app.get("/insert", function (req, res) {
	res.render("inserir.ejs");
});

app.post("/insert", function (req, res) {
	const pessoa = new Pessoa(0, req.body.nome, req.body.endereco, req.body.datanascimento);
	controle.inserePessoa(pessoa); 
	res.redirect("/");
});

app.get("/delete/:id", function (req, res) {
	controle.deletaPessoa(req.params.id)
	res.redirect("/")
});

app.get("/edit/:id", function (req, res) {
	res.render("edit.ejs", { dados: {} })
})

app.post("/edit/:id", function (req, res) {
	const pessoa = new Pessoa (
		req.params.id,
		req.body.nome,
		req.body.endereco,
		req.body.dataNascimento,
	)
	controle.updatePessoa(pessoa)
	console.log(pessoa)
	res.redirect("/")
})


app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`)
})
