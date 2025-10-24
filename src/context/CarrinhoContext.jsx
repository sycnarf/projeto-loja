import { createContext, useContext, useState, useEffect } from "react";

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

  function aumentarQuantidade(produtoId) {
    setItens((anterior) =>
      anterior.map((item) =>
        item.id === produtoId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item,
      ),
    );
  }

  function diminuirQuantidade(produtoId) {
    setItens((anterior) =>
      anterior
        .map((item) =>
          item.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    );
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
        aumentarQuantidade,
        diminuirQuantidade,
        total,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export default CarrinhoContext;
