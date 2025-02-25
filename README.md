# Teste NodeJS - Pay

## 📌 Descrição
Projeto desenvolvido para o desafio **Teste NodeJS - Pay**, que consiste na criação de um sistema de processamento de pagamentos integrado ao ambiente de homologação do Asaas. O sistema permite que os usuários gerem cobranças entre si por meio de Boleto, Cartão ou Pix.

![Image](https://raw.githubusercontent.com/jardelbordignon/nest-next-charge-app/refs/heads/main/assets/clip.gif)

## 🛠 Tecnologias Utilizadas
### **Backend (NestJS)**
- NestJS com **Fastify**
- Banco de dados **PostgreSQL**
- ORM **Prisma**
- Cliente HTTP **Axios**
- Gerenciador de pacotes **npm**

### **Frontend (Next.js)**
- Next.js
- Tailwind CSS


## 🚀 Instalação e Configuração

### **1️⃣ Clonar o repositório**
```sh
 git clone https://github.com/jardelbordignon/nest-next-charge-app
 cd nest-next-charge-app
```

### **2️⃣ Variáveis de ambiente para o backend**
Crie um arquivo **.env** na raiz do projeto backend e adicione as seguintes variáveis:

#### 🔹 `/backend/.env`
```
ASAAS_API_KEY='$your_asaas_api_key'
ASAAS_API_URL='https://sandbox.asaas.com/api/v3'
DATABASE_URL="postgresql://docker:docker@localhost:5432/node_pay?schema=public"
JWT_SECRET_KEY='any_secret_key'
```

### **3️⃣ Preparar o banco de dados**

```sh
cd backend
docker-compose up -d
npx prisma migrate deploy
npx prisma generate
```

### **4️⃣ Rodar o projeto backend**
```sh
cd backend
npm run dev
```

### **5️⃣ Rodar testes do backend**
```sh
cd backend
npm run spec -> executa os testes unitários
npm run test -> executa os testes de e2e
```


### **6️⃣ Variáveis de ambiente para o frontend**

#### 🔹 `frontend/.env`
```
NEXT_PUBLIC_API_BASE_URL='http://127.0.0.1:4000'
```

### **7️⃣ Rodar o projeto frontend**
```sh
cd frontend
npm run dev
```

Agora acesse o frontend no navegador em `http://127.0.0.1:3000`.

## 📝 Observações
- O backend foi desenvolvido com os recursos dependentes de abstrações, possibilitando a troca de implementações.
- O sistema recebe eventos do Asaas no endpoint `/charges/webhook`
- O frontend recebe mensagens do backend via websocket

![Image](https://raw.githubusercontent.com/jardelbordignon/nest-next-charge-app/refs/heads/main/assets/signup.png)
![Image](https://raw.githubusercontent.com/jardelbordignon/nest-next-charge-app/refs/heads/main/assets/signin.png)
![Image](https://raw.githubusercontent.com/jardelbordignon/nest-next-charge-app/refs/heads/main/assets/charges.png)
![Image](https://raw.githubusercontent.com/jardelbordignon/nest-next-charge-app/refs/heads/main/assets/newcharge.png)
![Image](https://raw.githubusercontent.com/jardelbordignon/nest-next-charge-app/refs/heads/main/assets/swagger.png)


Caso tenha dúvidas ou queira contribuir, abra uma issue no repositório! 🚀

