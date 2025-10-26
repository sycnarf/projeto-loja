import { Routes, Route, Link } from "react-router-dom";
import ProdutoLista from "./pages/ProdutoLista";
import ProdutoInfo from "./pages/ProdutoInfo";
import Carrinho from "./pages/Carrinho";
import { usarCarrinho } from "./context/CarrinhoContext";

export default function App() {
  const { itens } = usarCarrinho();
  const quantidadeDeItens = itens.reduce(
    (s, it) => s + (it.quantidade || 1),
    0,
  );
  return (
    <div className="app-root">
      <header className="header navbar">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h4 text-white m-0">Loja de Tralhas do Paulão</h1>
          <nav className="nav">
            <Link
              to="/"
              className="nav-link text-white d-flex align-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-shop me-1"
                viewBox="0 0 16 16"
              >
                <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
              </svg>
              Produtos
            </Link>
            <Link
              to="/carrinho"
              className="nav-link text-white d-flex align-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-cart me-1"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              Carrinho ({quantidadeDeItens})
            </Link>
          </nav>
        </div>
      </header>

      <main id="root-content" className="py-4">
        <div className="container">
          <Routes>
            <Route path="/" element={<ProdutoLista />} />
            <Route path="/produto/:id" element={<ProdutoInfo />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route
              path="*"
              element={
                <div className="text-center mt-5">
                  <h1 className="display-1 fw-bold">ERRO 404</h1>
                  <h2 className="fs-3">Página não encontrada</h2>
                  <Link to="/">Voltar</Link>
                </div>
              }
            />
          </Routes>
        </div>
      </main>

      <footer className="footer">
        &copy; 2025 Antone Salbego / Francys Ribeiro
      </footer>
    </div>
  );
}
