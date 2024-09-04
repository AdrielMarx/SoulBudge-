import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { listarTransacoes } from "../firebase/transacao";
import { listarDespesas } from "../firebase/despesa";
import { UsuarioContext } from "../contexts/UserContext";
import "../styles/Painel.css";
import BalancoMensal from "./BalancoMensal";

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const PainelControle = ({ onDataUpdate }) => {
  const [receita, setReceita] = useState(0);
  const [despesa, setDespesa] = useState(0);
  const [balanco, setBalanco] = useState(0);
  const [mes, setMes] = useState(new Date().getMonth());
  const usuario = useContext(UsuarioContext);

  // Função para formatar valores em moeda brasileira
  const formatarMoeda = (valor) => {
    // Garante que o valor é um número e não é NaN
    const valorNumerico = isNaN(valor) ? 0 : parseFloat(valor);
    return valorNumerico.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  useEffect(() => {
    const calcularValores = async () => {
      if (!usuario) return;

      try {
        const transacoes = await listarTransacoes(usuario.uid);
        const despesas = await listarDespesas(usuario.uid);

        let totalReceita = 0;
        let totalDespesa = 0;

        transacoes.forEach((transacao) => {
          const valor = parseFloat(transacao.valor);
          const dataTransacao = new Date(transacao.data);
          const mesTransacao = dataTransacao.getMonth();

          if (
            !isNaN(valor) &&
            transacao.tipo === "receita" &&
            mesTransacao === mes
          ) {
            totalReceita += valor;
          }
        });

        despesas.forEach((despesa) => {
          const valor = parseFloat(despesa.valor);
          const dataDespesa = new Date(despesa.data);
          const mesDespesa = dataDespesa.getMonth();

          if (
            !isNaN(valor) &&
            despesa.tipo === "despesa" &&
            mesDespesa === mes
          ) {
            totalDespesa += valor;
          }
        });

        setReceita(totalReceita);
        setDespesa(totalDespesa);
        setBalanco(totalReceita - totalDespesa);

        if (onDataUpdate) {
          onDataUpdate({
            receita: totalReceita,
            despesa: totalDespesa,
            balanco: totalReceita - totalDespesa,
            mes: mes,
          });
        }
      } catch (error) {
        console.error("Erro ao listar transações:", error);
      }
    };

    calcularValores();
  }, [usuario, mes]);

  const handleMesChange = (event) => {
    setMes(parseInt(event.target.value, 10));
  };

  const getBalancoClass = () => {
    if (balanco === 0) return "painel-card-balanco-neutro";
    return balanco > 0
      ? "painel-card-balanco-positivo"
      : "painel-card-balanco-negativo";
  };

  return (
    <>
      <main className="painel-ajusteMenu">
        <h1 className="painel-tituloDashboard">Painel de Controle</h1>
        <div className="painel-seletorMes">
          <label htmlFor="mes">Selecionar Mês:</label>
          <select id="mes" value={mes} onChange={handleMesChange}>
            {meses.map((mesNome, index) => (
              <option key={index} value={index}>
                {mesNome}
              </option>
            ))}
          </select>
        </div>
        <div className="cu">
          <section className="painel-dashboard-container">
            <a href="/financas/renda" className="painel-card-link">
              <div className="painel-card painel-card-receita">
                <h3>Receita</h3>
                <p>{formatarMoeda(receita)}</p>
                <i className="bi bi-plus-circle-fill"></i>
              </div>
            </a>
            <a href="/financas/despesa" className="painel-card-link">
              <div className="painel-card painel-card-despesa">
                <h3>Despesa</h3>
                <p>{formatarMoeda(despesa)}</p>
                <i className="bi bi-dash-circle-fill"></i>
              </div>
            </a>
            <a href="#balanco" className="painel-card-link">
              <div
                className={`painel-card painel-card-balanco ${getBalancoClass()}`}
              >
                <h3>Saldo</h3>
                <p>{formatarMoeda(balanco)}</p>
                <i className="bi bi-plus-slash-minus"></i>
              </div>
            </a>
          </section>
        </div>
      </main>
      <section>
        <BalancoMensal mesSelecionado={mes} />
      </section>
    </>
  );
};

// Adicionando PropTypes
PainelControle.propTypes = {
  onDataUpdate: PropTypes.func.isRequired,
};

export default PainelControle;
