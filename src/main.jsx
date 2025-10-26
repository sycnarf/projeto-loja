import { createRoot } from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { CarrinhoProvider } from "./context/CarrinhoContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";

createRoot(document.getElementById("root")).render(
  <CarrinhoProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </CarrinhoProvider>,
);
