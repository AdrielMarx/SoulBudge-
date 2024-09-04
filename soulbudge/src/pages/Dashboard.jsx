import { useEffect, useState } from "react";
import PainelControle from "../components/Painel";
import Avisos from "../components/Avisos";
import CardPlanejamento from "../components/CardPlanejamento";
import GraficoCategoria from "../pages/GraficoCategoria";
import NotificacaoPlanejamento from "../components/NotificacaoPlanejamento";

function Dashboard() {
  const [painelData, setPainelData] = useState({
    receita: 0,
    despesa: 0,
    balanco: 0,
    mes: new Date().getMonth(),
  });

  const handleDataUpdate = (data) => {
    setPainelData(data);
  };

  useEffect(() => {}, []);

  return (
    <main>
      <Avisos />
      <PainelControle onDataUpdate={handleDataUpdate} />
      <CardPlanejamento
        mesAtual={painelData.mes}
        anoAtual={new Date().getFullYear()}
      />
      <GraficoCategoria
        mesAtual={painelData.mes}
        anoAtual={new Date().getFullYear()}
      />
      <NotificacaoPlanejamento mesAtual={painelData.mes} />
    </main>
  );
}

export default Dashboard;
