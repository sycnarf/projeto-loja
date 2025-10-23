import { Link } from "react-router-dom";
import { useState } from "react";
import { usarCarrinho } from "../context/CarrinhoContext";

export default function Carrinho() {
  const { itens, removerDoCarrinho, limparCarrinho, total } = usarCarrinho();
  const [sucesso, setSucesso] = useState(false);

  function finalizarCompra() {
    limparCarrinho();
    setSucesso(true);
  }

  return (
    <section className="carrinho">
      <h2>Carrinho</h2>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div>Itens: {itens.reduce((s, i) => s + (i.quantidade || 1), 0)}</div>
        <div className="fw-bold">Total: R$ {total}</div>
      </div>

      {sucesso ? (
        <div className="alert alert-success" role="alert">
          <div>
            <h5 className="alert-heading">Compra efetuada com sucesso!</h5>
            <Link to="/" className="btn btn-primary">
              Voltar à loja
            </Link>
          </div>
        </div>
      ) : (
        <>
          {itens.length === 0 ? (
            <div className="alert alert-light">Seu carrinho está vazio.</div>
          ) : (
            <ul className="list-group mb-3">
              {itens.map((it) => (
                <li
                  key={it.id}
                  className="list-group-item d-flex align-items-center"
                >
                  <img
                    src={it.imagem}
                    alt={it.titulo}
                    style={{ width: 80, height: 60, objectFit: "cover" }}
                    className="me-3"
                  />
                  <div className="flex-grow-1">
                    <div className="fw-bold">{it.titulo}</div>
                    <div>
                      R$ {it.preco} x {it.quantidade}
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removerDoCarrinho(it.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={finalizarCompra}>
              Comprar
            </button>
            <button className="btn btn-danger" onClick={limparCarrinho}>
              Limpar
            </button>
          </div>
        </>
      )}
    </section>
  );
}
