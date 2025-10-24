import db from "../../db.json";

export async function obterProdutos() {
  return db.produtos;
}

export async function obterProduto(id) {
  return db.produtos.find((produto) => produto.id === id);
}
