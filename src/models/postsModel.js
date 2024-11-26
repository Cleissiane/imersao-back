import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados MongoDB usando a string de conexão fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);


// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados e a coleção de posts
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    // Retorna um array com todos os posts
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
     const db = conexao.db("imersao-instabytes");
     const colecao = db.collection("posts");
     return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}