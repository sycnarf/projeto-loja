import { Routes, Route, Link } from "react-router-dom";
import ProdutoLista from "./pages/ProdutoLista";
import ProdutoInfo from "./pages/ProdutoInfo";
import Carrinho from "./pages/Carrinho";
import { usarCarrinho } from "./context/CarrinhoContext";

export default function App() {
  const { itens } = usarCarrinho();
  const quantidadeDeItens = itens.reduce((s, it) => s + (it.quantidade || 1), 0);
  return (
    <div className="app-root">
      <header className="cabecalho-site navbar">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h4 text-white m-0">Minha Loja</h1>
          <nav className="nav">
            <Link to="/" className="nav-link text-white">
              Produtos
            </Link>
            <Link to="/carrinho" className="nav-link text-white">
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
                <div>
                  <h2>Página não encontrada</h2>
                  <Link to="/">Voltar</Link>
                </div>
              }
            />
          </Routes>
        </div>
      </main>

      <footer className="rodape-site">2025 Direitos Autorais</footer>
    </div>
  );
}
