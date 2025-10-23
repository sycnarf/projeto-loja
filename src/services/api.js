/* globals fetch */
const BASE_URL = "http://localhost:3000";

export async function obterProdutos() {
  const response = await fetch(`${BASE_URL}/produtos`);
  return await response.json();
}

export async function obterProduto(id) {
  const response = await fetch(`${BASE_URL}/produtos/${id}`);
  return await response.json();
}

export async function criarProduto(produto) {
  const response = await fetch(`${BASE_URL}/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });
  return await response.json();
}

export async function atualizarProduto(id, produto) {
  const response = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });
  return await response.json();
}

export async function deletarProduto(id) {
  const response = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}
