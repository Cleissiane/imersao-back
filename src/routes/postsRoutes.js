import express from "express";// Importa o framework Express para criar e gerenciar o servidor web.
import multer from "multer";// Importa o pacote multer para lidar com uploads de arquivos.
// Importa funções específicas (listarPosts, postarNovoPost, uploadImagem) do controlador de posts.
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configuração do armazenamento para o multer, definindo onde e como os arquivos serão armazenados.
const storage = multer.diskStorage({
    // Define o diretório de destino para os uploads.
    destination: function (req, file, cb) {
        // Passa o caminho do diretório onde os arquivos serão armazenados.
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo salvo no servidor.
    filename: function (req, file, cb) {
        // Utiliza o nome original do arquivo para salvá-lo.
        cb(null, file.originalname);
    }
});

// Cria uma instância do multer, associando a configuração de armazenamento definida acima.
const upload = multer({ storage });

// Define as rotas do aplicativo. A função recebe a instância do aplicativo Express como parâmetro.
const routes = (app) => {
    app.use(express.json());// Middleware para habilitar o parsing de JSON no corpo das requisições.
    app.use(cors(corsOptions))
    
    app.get("/posts", listarPosts);// Define uma rota GET em "/posts" que executa a função listarPosts quando acessada.
    
    app.post("/posts", postarNovoPost);// Define uma rota POST em "/posts" que executa a função postarNovoPost ao receber dados para criar um novo post.
    
    // Define uma rota POST em "/upload" que lida com o upload de um único arquivo (chave "imagem" no formulário).
    // Após o upload, chama a função uploadImagem.
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes como padrão, permitindo que seja importada em outros arquivos.
export default routes;
