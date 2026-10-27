# Programania

Programania é uma plataforma de incentivo à introdução à programação para crianças. A aplicação oferece autenticação, cadastro de usuários e uma área protegida para explorar fases, acessar desafios e acompanhar conteúdos de aprendizagem.

## Funcionalidades

- Login com e-mail e senha.
- Autenticação com Google.
- Cadastro de novos usuários.
- Listagem e busca de fases disponíveis.
- Visualização dos detalhes de uma fase.
- Acesso a desafios dentro de cada fase.
- Área de ajuda, perfil e minhas fases.
- Controle de acesso por autenticação, com redirecionamento para `/login` quando necessário.
- Notificações de sucesso e erro com Sonner.

## Tecnologias

- React 19
- Vite
- React Router DOM
- Axios
- Styled Components
- Tailwind CSS
- Sonner
- Oxlint

## Pré-requisitos

- Node.js instalado.
- npm ou outro gerenciador de pacotes compatível.
- A API do projeto disponível para autenticação e carregamento das fases.

## Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone <url-do-repositorio>
cd programania
```

Instale as dependências:

```bash
npm install
```

## Executando em desenvolvimento

Inicie o servidor do Vite:

```bash
npm run dev
```

Por padrão, a aplicação fica disponível em:

```text
http://localhost:5175
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a versão de produção. |
| `npm run preview` | Executa uma prévia da build de produção. |
| `npm run lint` | Executa o Oxlint. |

## Rotas

### Rotas públicas

| Rota | Descrição |
| --- | --- |
| `/login` | Login por credenciais ou Google. |
| `/cadastro` | Cadastro de usuário. |

### Rotas protegidas

As rotas abaixo exigem autenticação:

| Rota | Descrição |
| --- | --- |
| `/` | Página inicial com as fases disponíveis. |
| `/fases` | Lista de fases. |
| `/fases/:uuid` | Detalhes de uma fase. |
| `/fases/:uuid/desafio/:desafioUuid` | Acesso a um desafio específico. |
| `/ajuda` | Página de ajuda. |
| `/perfil` | Perfil do usuário. |
| `/minhas-fases` | Fases do usuário. |

## Estrutura principal

```text
src/
├── assets/         # Imagens e recursos visuais
├── components/     # Componentes reutilizáveis da interface
├── context/        # Contextos globais, como autenticação
├── hooks/          # Hooks e proteção de rotas
├── pages/          # Páginas da aplicação
├── services/       # Comunicação com a API
├── App.jsx         # Configuração das rotas
└── main.jsx        # Ponto de entrada da aplicação
```

## Autenticação

O token de autenticação é armazenado no `localStorage`. Ao iniciar a aplicação, o contexto de autenticação tenta recuperar o usuário atual. Usuários não autenticados são direcionados para `/login` pelas rotas protegidas.

O login social utiliza o endpoint de autorização do Google disponibilizado pela API do projeto:

```text
https://programania-api.onrender.com/oauth2/authorization/google
```

## Build de produção

Para gerar a aplicação otimizada:

```bash
npm run build
```

Para visualizar localmente o resultado da build:

```bash
npm run preview
```

## Observações

- A aplicação utiliza a porta `5175` no servidor de desenvolvimento.
- O funcionamento completo depende da API responsável por autenticação, usuários, fases e desafios.
- O fluxo de recuperação de senha está previsto no roteamento, mas ainda não está habilitado.
