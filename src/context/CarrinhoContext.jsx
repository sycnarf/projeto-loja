import React, { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext(null);

export function usarCarrinho() {
  return useContext(CarrinhoContext);
}

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    try {
      const dadosBrutos = localStorage.getItem("carrinho_itens");
      return dadosBrutos ? JSON.parse(dadosBrutos) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("carrinho_itens", JSON.stringify(itens));
    } catch (e) {}
  }, [itens]);

  function adicionarAoCarrinho(produto, quantidade = 1) {
    setItens((anterior) => {
      const encontrado = anterior.find((i) => i.id === produto.id);
      if (encontrado) {
        return anterior.map((i) =>
          i.id === produto.id
            ? { ...i, quantidade: i.quantidade + quantidade }
            : i,
        );
      }
      return [...anterior, { ...produto, quantidade }];
    });
  }

  function removerDoCarrinho(produtoId) {
    setItens((anterior) => anterior.filter((i) => i.id !== produtoId));
  }

  function limparCarrinho() {
    setItens([]);
  }

  const total = itens.reduce(
    (s, it) => s + (it.preco || 0) * (it.quantidade || 1),
    0,
  );

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        total,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export default CarrinhoContext;
