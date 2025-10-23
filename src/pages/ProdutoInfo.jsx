import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { obterProduto } from "../services/api";
import { usarCarrinho } from "../context/CarrinhoContext";

export default function ProdutoInfo() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    obterProduto(id).then(setProduto);
  }, [id]);

  const { adicionarAoCarrinho } = usarCarrinho();

  if (!produto)
    return (
      <div>
        <h2>Produto não encontrado</h2>
        <Link to="/">Voltar à lista</Link>
      </div>
    );

  return (
    <article className="detalhe-produto">
      <div className="row">
        <div className="col-md-6">
          <img
            alt={produto.titulo}
            src={produto.imagem}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>{produto.titulo}</h2>
          <p>{produto.descricao}</p>
          <p className="h5">R$ {produto.preco}</p>
          <p>Nota: {produto.nota}</p>
          <div className="mt-3">
            <button
              className="btn btn-primary"
              onClick={() => adicionarAoCarrinho(produto)}
            >
              Adicionar ao carrinho
            </button>
            <Link to="/carrinho" className="btn btn-outline-secondary ms-2">
              Ir para o carrinho
            </Link>
          </div>
          <div className="mt-3">
            <Link to="/">Voltar à lista</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
