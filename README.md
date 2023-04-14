<h1 align="center">
  <img
    src=".github/logo-ignite.svg"
    title="Logo Ignite Rocketseat"
    alt="Logo Ignite Rocketseat"
    width="30px"
  />
  Challenge Fundamentos do Node.js
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/pabloxt14/Ignite_Node.js_01-Challenge_Fundamentos_do_Node.js">

  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/pabloxt14/Ignite_Node.js_01-Challenge_Fundamentos_do_Node.js" />

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/pabloxt14/Ignite_Node.js_01-Challenge_Fundamentos_do_Node.js">
  
  <a href="https://github.com/pabloxt14/Ignite_Node.js_01-Challenge_Fundamentos_do_Node.js/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/pabloxt14/Ignite_Node.js_01-Challenge_Fundamentos_do_Node.js">
  </a>
    
  <img alt="License" src="https://img.shields.io/github/license/pabloxt14/Ignite_Node.js_01-Challenge_Fundamentos_do_Node.js">

  <a href="https://github.com/pabloxt14/Ignite_Node.js_01-Challenge_Fundamentos_do_Node.js/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/pabloxt14/Ignite_Node.js_01-Challenge_Fundamentos_do_Node.js?style=social">
  </a>
</p>

<h4 align="center"> 
	🚀 Aplicação Finalizada 🚀
</h4>

<p align="center">
 <a href="#-about">About</a> |
 <a href="#-deploy">Deploy</a> | 
 <a href="#-how-it-works">How It Works</a> | 
 <a href="#-technologies">Technologies</a> | 
 <a href="#-author">Author</a> | 
 <a href="#-license">License</a>
</p>


## 💻 About

Este é o repositório de uma API Node.js, que tem como objetivo realizar o CRUD de tasks(tarefas). O projeto tem como finalidade treinar conceitos fundamentais do Node.js, tais como:

- Utilização do módulo nativo `http` para criar um `servidor` e `rotas`.
- Utilização de `streams` para transmitir dados em partes.
- Utilização de `middlewares` para verificação, conversão e tratamento de erros, melhorarando assim a segurança da aplicação.

Vale ressaltar que este projeto foi desenvolvido como conclusão de um desafio proposto pela trilha/curso **Ignite** oferecido pela [Rocketseat](https://www.rocketseat.com.br/).

---

## 🔗 Deploy

A API pode ser acessada através da seguinte URL base: https://ignite-node-challenge-01.onrender.com

> Obs: a aplicação pode demorar um pouco para entrar na primeira execução depois de um tempo, devido ao back-end estar rodando através do plano gratuito na plataforma de hospedagem.

---

## 🚀 How it works

### Pré-requisitos

Antes de baixar o projeto você vai precisar ter instalado na sua máquina as seguintes ferramentas:

* [Git](https://git-scm.com)
* [NodeJS](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/)

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Backend (servidor)

```bash
# Clone este repositório
$ git clone git@github.com:pabloxt14/Ignite_Node.js_01-Challenge_Fundamentos_do_Node.js.git

# Acesse a pasta do projeto no terminal/cmd
$ cd Ignite_Node.js_01-Challenge_Fundamentos_do_Node.js

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3333 - acesse http://localhost:3333

```

### Rotas

| Método | Rota	| Descrição	| Parâmetros |
| --- | --- | --- | --- |
| POST | /tasks | Cria uma nova tarefa | `title`, `description` |
| GET | /tasks | Retorna todas as tarefas cadastradas; Ou somente as terfas que apresentarem no `title` ou `description` o valor enviado no parâmetro `search` | `search`(opcional) |
| PUT | /tasks/:id | Atualiza uma tarefa específica | `id`,`title`,`description` |
| DELETE | /tasks/:id | Deleta uma tarefa específica | `id` |
| PATCH | /tasks/:id | Conclui/Desfaz uma tarefa específica | `id` |
| POST | /tasks/import | Cria um conjunto de tarefas especificadas em um arquivo `csv` | `file`(multipart/form-data) |

> Obs: todos os parâmetros enviados e respondidos no corpo da requisição e resposta estão no formato `JSON`.

---

## 🛠 Technologies

As seguintes ferramentas foram usadas na construção do projeto:

#### **Server**  ([NodeJS](https://nodejs.org/en/))

-   **[Multer](https://www.npmjs.com/package/multer)**
-   **[csv-parse](https://www.npmjs.com/package/csv-parse)**

> Veja o arquivo [package.json](./package.json) para mais detalhes sobre as dependências utilizadas no projeto.
---

## ✍ Author

<a href="https://github.com/PabloXT14">
  <img alt="PabloXT14" title="PabloXT14" src="https://github.com/PabloXT14.png" width="100px" />
  <br />
  <sub>
    <strong>Pablo Alan</strong> 🚀
  </sub>
</a>

<br />

[![Linkedin Badge](https://img.shields.io/badge/-Pablo_Alan-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/pabloalan/)](https://www.linkedin.com/in/pabloalan/)

[![Gmail Badge](https://img.shields.io/badge/-pabloxt14@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:pabloxt14@gmail.com)](mailto:pabloxt14@gmail.com)

---

## 📝 License

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais informações

Feito com 💜 por Pablo Alan 👋🏽 [Entre em contato!](https://www.linkedin.com/in/pabloalan/)
