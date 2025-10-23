import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { obterProdutos } from "../services/api";
import { usarCarrinho } from "../context/CarrinhoContext";

export default function ProdutoLista() {
  const { adicionarAoCarrinho } = usarCarrinho();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    obterProdutos().then(setProdutos);
  }, []);

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
                <p className="card-text">Nota: {p.nota}</p>
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
                      Ver
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
