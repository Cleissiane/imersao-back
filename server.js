// Importa as dependências necessárias para o projeto
import express from "express";
import routes from "./src/routes/postsRoutes.js";


// Array de posts simulado (será substituído por dados do banco de dados)
const posts =[
    {id: 1, descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"},
    // ... outros posts
];

// Cria uma instância do servidor Express
const app = express();
app.use(express.static("uploads"))
routes(app);


// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});
