# Aprovando pull requests com Node.js e a API Octokit
> ### Exemplo de uso para a API Octokit

<br>

## Pré-requisitos

- [x] Node.js versão 18 ou superior https://nodejs.org
- [x] npm (gerenciador do pacote Node.js): https://www.npmjs.com

---

## Configuração

Clone o repositório do projeto:
```bash
git clone https://github.com/PedroFnseca/approve_pull_requests.git
```

Entre no projeto.
```bash
cd approve_pull_requests
```

instale as depêndencias.
```bash
npm install
```

Crie um token de acesso pessoal no GitHub [com os seguintes passos](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

Tenha certeza de ter selecionado a seguinte opção: 
<p align="center">
  <img src="https://github.com/PedroFnseca/approve_pull_requests/assets/97262778/e298a20b-2df2-4ad4-ad06-77399d4e442b">
</p>

Entre no arquivo `.env` e coloque o token
```
GITHUB_TOKEN=SEU-TOKEN-GERADO
```


---

## Uso

Para configurar quais repositorios você quer automatizar as aprovações de pull requests você deve entrar no arquivo `index.js` e alterar a variavel `repos` que está na função `main()`
```js
const repos = [
  {
    owner: "user_name",
    repo: "repository_name1"
  },
  {
    owner: "user_name",
    repo: "repository_name2"
  },
  {
    owner: "user_name",
    repo: "repository_name3"
  }
]
```
Neste array você deve colocar quais locais você quer que ele olhe. sendo o `owner` o usuario ou org que é dona daquele repositorio e o `repo` sendo o repositorio daquele usuário.

---

## Rodando o projeto

Basta somente entrar dentro do projeto e rodar:
```bash
npm run start
```

Caso tenha alguma pr naquele dia para ser aprovada ele irá aprovar e printar no console a pr que foi aprovada, senão ele irá mostrar uma mensagem dizendo que não tem nenhuma pull request a ser aprovada naquele dia `OBS: o algoritmo somente aprova pull requests criadas no mesmo dia em que o script está sendo rodado` 
