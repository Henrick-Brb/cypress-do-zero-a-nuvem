# 🌲 Cypress, do Zero à Nuvem ☁️

## Sobre o Projeto

Este repositório contém os exemplos práticos do curso **"Cypress, do Zero à Nuvem"** da Escola Talking About Testing. Aqui você encontrará demonstrações de como configurar, escrever e executar testes automatizados end-to-end com Cypress, além de tópicos como integração contínua, comandos customizados, upload de arquivos, simulação de dispositivos móveis e integração com Cypress Cloud.

---

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (recomendado: v20.13.1 ou superior)
- [npm](https://www.npmjs.com/) ( já vem com o Node.js)
- [git](https://git-scm.com/) (para clonar o repositório)
- [Visual Studio Code](https://code.visualstudio.com/) ou outro editor de código de sua preferência

Para verificar se já possui as versões necessárias, execute no terminal:

```sh
git --version && node --version && npm --version
```

---

## Instalação

Clone o repositório e instale as dependências do projeto:

```sh
git clone https://github.com/seu-usuario/cypress-do-zero-a-nuvem.git
cd cypress-do-zero-a-nuvem
npm install
```

---

## Como Executar os Testes

### Modo Interativo (Cypress App)

Abra a interface gráfica do Cypress para selecionar e rodar os testes manualmente:

```sh
npm run cy:pc
```

### Modo Headless (linha de comando)

Execute todos os testes automaticamente no terminal:

```sh
npm run test:pc
```

### Simulação de Dispositivo Móvel

- **Interativo:**  
  ```sh
  npm run cy:mobile
  ```
- **Headless:**  
  ```sh
  npm run test:mobile
  ```

Os testes estão localizados na pasta [`cypress/e2e/`](cypress/e2e/).