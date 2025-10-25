import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { obterProduto } from "../services/api";
import { usarCarrinho } from "../context/CarrinhoContext";

export default function ProdutoInfo() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    obterProduto(id).then(setProduto).catch(setErro);
  }, [id]);

  const { adicionarAoCarrinho } = usarCarrinho();

  if (erro) return <div>Erro ao carregar o produto.</div>;

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
          <p>
            Nota: {produto.nota}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="var(--app-accent)"
              class="bi bi-star-fill ms-1 mb-1"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </p>
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
