import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { obterProdutos } from "../services/api";
import { usarCarrinho } from "../context/CarrinhoContext";

export default function ProdutoLista() {
  const { adicionarAoCarrinho } = usarCarrinho();
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    obterProdutos().then(setProdutos).catch(setErro);
  }, []);

  if (erro) return <div>Erro ao carregar os produtos.</div>;

  return (
    <section className="produtos">
      <h2 className="mb-3">Lista de Produtos</h2>
      <div className="row g-3">
        {produtos.map((p) => (
          <div key={p.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100">
              <img src={p.imagem} className="card-img-top" alt={p.titulo} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <Link to={`/produto/${p.id}`}>{p.titulo}</Link>
                </h5>
                <p className="card-text">
                  {p.nota}
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
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <div className="fw-bold">R$ {p.preco}</div>
                  <div>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => adicionarAoCarrinho(p)}
                    >
                      Comprar
                    </button>
                    <Link
                      to={`/produto/${p.id}`}
                      className="btn btn-outline-secondary btn-sm"
                    >
                      Ver descrição
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
