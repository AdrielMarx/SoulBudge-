import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contato from "./pages/contato";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import { Toaster } from "react-hot-toast";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";
import Header from "./components/Header";
import Rodape from "./components/Rodape";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EditarRenda from "./pages/EditarRenda";
import Renda from "./pages/Renda";
import NovaRenda from "./pages/NovaRenda";
import Despesa from "./pages/Despesa";
import { UsuarioContext } from "./contexts/UserContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import NovaDespesa from "./pages/NovaDespesa";
import EditarDespesa from "./pages/EditarDespesa";
import NovoPlanejamento from "./pages/NovoPlanejamento";
import ExibirPlanejamento from "./pages/ExibirPlanejamento";
import EditarPlanejamento from "./pages/EditarPlanejamento";
import Loader from "./components/Loader";

function App() {
  const [usuarioLogado, setusuarioLogado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("app");
    onAuthStateChanged(auth, (user) => {
      setusuarioLogado(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader/>;
  }

  return (
    <UsuarioContext.Provider value={usuarioLogado}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/financas" element={<Dashboard />} />
          <Route path="/financas/renda" element={<Renda />} />
          <Route path="/financas/renda/novarenda" element={<NovaRenda />} />
          <Route path="/financas/editar/:id" element={<EditarRenda />} />
          <Route path="/planejamento/novo" element={<NovoPlanejamento />} />
          <Route path="/planejamento/:id" element={<ExibirPlanejamento />} />
          <Route
            path="/planejamento/editar/:id"
            element={<EditarPlanejamento />}
          />
          <Route path="/financas/despesa" element={<Despesa />} />
          <Route
            path="/financas/despesa/novadespesa"
            element={<NovaDespesa />}
          />
          <Route
            path="/financas/editardespesa/:id"
            element={<EditarDespesa />}
          />
          <Route
            path="/PoliticaPrivacidade"
            element={<PoliticaPrivacidade />}
          />
        </Routes>
        <Rodape />
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </UsuarioContext.Provider>
  );
}

export default App;
