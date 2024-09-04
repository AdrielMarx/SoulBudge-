# SoulBudge - Sua Energia Financeira

💰 **SoulBudge** 💰

![Vídeo em formato GIF](./soulbudge/public/img/video_soulbudge.gif)

🚧 **Status:** Em Progresso ✔️

## 🗺️ Índice

<a name="topo"></a>

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Comandos de Instalação](#comandos-de-instalacão)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Visualizar o Site](#visualizar-o-site)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Agradecimentos](#-agradecimentos)

🚧 **Status:** Em Progresso ✔️

## 📝 Visão Geral

**SoulBudge é uma aplicação web de gestão financeira pessoal**, projetada para ser simples e fácil de usar. Com ela, os usuários podem acompanhar suas despesas e receitas, definir orçamentos, receber lembretes de pagamentos e visualizar suas finanças de maneira clara e interativa. Ideal para quem busca organização financeira e decisões mais informadas.

## 🔥 Funcionalidades

### 👩‍💻 Autenticação de Usuário:

- Registro e login de usuários utilizando Firebase Authentication.
- Login via redes sociais (Google e Facebook).
- Recuperação e redefinição de senha.

### 👨🏾‍🦳 Gestão de Perfil:

- Visualização e edição de informações do perfil (nome, email).
- Funcionalidade de logout.

### 📲 Painel de Controle:

- Resumo das finanças com saldo atual, despesas e receitas do mês.
- Gráficos interativos para visualização de indicadores e métricas financeiras.

### 🛰️ Rastreamento de Despesas e Receitas:

- Adição manual de despesas e receitas.
- Categorização de transações em categorias como Moradia, Alimentação, Transporte, etc.

### 💸 Orçamentos:

- Criação de orçamentos mensais para diferentes categorias.
- Alertas e notificações quando os limites orçamentários são atingidos.

### ⏰ Lembretes de Pagamentos:

- Criação de lembretes para pagamentos futuros.
- Notificações para evitar atrasos e cobranças de juros.

### 📐 Design Responsivo:

- Interface amigável e acessível em dispositivos móveis, tablets e desktops.
- Suporte para tema escuro e claro.

[Voltar ao topo](#topo)

## 🔎 Tecnologias Utilizadas

### Frontend:

- React
- JavaScript (ES6+)
- HTML5/CSS3
- Bootstrap
- Chart.js/D3.js (para gráficos)

### Backend:

- Firebase (Authentication, Firestore)

### Ferramentas de Desenvolvimento:

- Git & GitHub
- Visual Studio Code
- Insomnia (para testes de API)

[Voltar ao topo](#topo)

## 💻 Instalação

### Pré-requisitos

- Node.js
- NPM
- Conta no Firebase

### 🦿 Passos para Instalação

**1. Clone o repositório para o seu ambiente local:**

```bash
git clone https://github.com/almir-soulcode/financas-rn2-front
```

**2. Navegue até o diretório do projeto:**

```bash
cd soulbudge
```

**3.Instale as dependências:**

```bash
npm install
```

### Configure o Firebase:

1 - Crie um projeto no Firebase.

2 - Configure o Authentication e Firestore no Firebase Console.

3 - Copie as credenciais do Firebase para o arquivo .env.local.

4 - Inicie a aplicação:

```bash
npm run dev
```

A aplicação estará disponível em http://localhost:5173/.

[Voltar ao topo](#topo)

## 🚀 Como Usar

**1 - Registro e Login:**

- Crie uma conta ou faça login utilizando uma conta existente.
- Caso esqueça sua senha, utilize a opção de recuperação de senha.

**2 - Gerenciamento de Perfil:**

- Após o login, acesse a área do perfil para visualizar ou editar suas informações.

**3 - Painel de Controle:**

- No dashboard, você encontrará um resumo das suas finanças, incluindo gráficos interativos que mostram suas despesas e receitas.

**4 - Adicionar Transações:**

- Utilize a opção de adicionar despesas e receitas para manter seu registro financeiro atualizado.

**5 - Orçamentos e Lembretes:**

- Defina orçamentos para diferentes categorias e crie lembretes de pagamentos para evitar atrasos.

## 🤖 Comandos de Instalação

```bash
npm install icons
```

```bash
npm install react
```

```bash
npm install firebase
```

```bash
npm i bootstrap
```

```bash
npm install react-bootstrap
```

```bash
npm create vite@latest
```

```bash
npm i bootstrap-icons
```

```bash
npm install react-scroll
```

```bash
npm install react-chartjs-2 chart.js
```

```bash
npm install chartjs-plugin-annotation
```

```bash
npm install chartjs-plugin-datalabels
```

[Voltar ao topo](#topo)

## 🗂 Estrutura do Projeto

```bash
soulbudge/               # Diretório raiz do projeto
│
├── github-action-react/ # Diretório para ações do GitHub relacionadas ao React
│
├── node_modules/        # Dependências do Node.js
│
├── public/              # Arquivos públicos
│   ├── img/             # Imagens públicas
│   ├── vite.svg         # Logo Vite
│   └── index.html       # Template HTML principal
│
├── src/                 # Arquivos de código-fonte
│   ├── assets/          # Imagens, fontes, etc.
│   ├── components/      # Componentes React
│   ├── contexts/        # Contextos de estado global
│   ├── firebase/        # Configurações e integrações do Firebase
│   ├── pages/           # Páginas da aplicação
│   ├── styles/          # Estilos CSS/SASS
│   ├── App.jsx          # Componente principal do React
│   ├── index.css        # Estilos globais
│   ├── main.jsx         # Arquivo de entrada principal do React
│   └── utilsDate.js     # Utilitários de data
│
├── .firebaserc          # Configuração do Firebase
├── .gitignore           # Arquivos e diretórios ignorados pelo Git
├── eslint.config.js     # Configurações do ESLint
├── firebase.json        # Configurações do Firebase para o projeto
├── index.html           # (Duplicado em relação ao public/index.html)
├── package-lock.json    # Lockfile do npm
├── package.json         # Dependências e scripts NPM
├── vite.config.js       # Configurações do Vite
└── README.md            # Documentação do projeto
```

[Voltar ao topo](#topo)

## 🏦 Contribuição

Se você deseja contribuir com o SoulBudge, siga os passos abaixo:

### Fork o repositório.

**1. Crie uma nova branch com sua funcionalidade ou correção de bug:**

```bash
git checkout -b feature/nome-da-feature
```

**2. Commit suas mudanças:**

```bash
git commit -m 'Adiciona nova feature'
```

**3. Envie para sua branch:**

```bash
git push origin feature/nome-da-feature
```

**4. Abra um Pull Request.**

[Voltar ao topo](#topo)

## 🏦 Visualizar o Site

**Visite nosso site clicando aqui --> [SoulBudge](https://controle-de-financas-73491.web.app)**

### QR_Code do Site

SoulBudge - Sua Energia Financeira

<p align="left">
  <img src="./soulbudge/public/img/QRCode_soulbudge.svg" alt="Qr Code da pagina do Site" style="width: 150px; height: 150px;">
</p>

[Voltar ao topo](#topo)

## 🔑 Licença

Distribuído sob a licença MIT. Veja [MIT License](https://opensource.org/licenses/MIT) para mais informações.

[Voltar ao topo](#topo)

## 🤝 Agradecimentos

💰 Um grande obrigado a todos que participaram de alguma forma no projeto e aos nossos professores @Almir e @Gabriel pelo suporte.

[Voltar ao topo](#topo)
