import React, { useEffect, useState, useContext } from "react";
import "../styles/Avisos.css";
import { UsuarioContext } from "../contexts/UserContext";
import { listarDespesas, marcarComoPaga } from "../firebase/despesa";

function Avisos() {
  const [avisos, setAvisos] = useState([]);
  const usuario = useContext(UsuarioContext);

  useEffect(() => {
    const carregarAvisos = async () => {
      if (!usuario) return;

      try {
        const despesas = await listarDespesas(usuario.uid);
        const hoje = new Date();

        const avisosFiltrados = despesas
          .filter((despesa) => despesa.tipo === "despesa" && !despesa.paga)
          .map((despesa) => {
            const dataVencimento = new Date(despesa.data + "T00:00:00");
            const diasParaVencimento = Math.ceil(
              (dataVencimento - hoje) / (1000 * 60 * 60 * 24)
            );
            if (diasParaVencimento <= 7) {
              return {
                ...despesa,
                estilo: determinarEstiloCard(dataVencimento),
                mensagemVencimento: criarMensagemVencimento(dataVencimento),
              };
            }
            return null;
          })
          .filter((aviso) => aviso !== null);

        setAvisos(avisosFiltrados);
      } catch (error) {
        console.error("Houve um problema ao carregar os avisos:", error);
      }
    };

    carregarAvisos();
  }, [usuario]);

  const determinarEstiloCard = (dataVencimento) => {
    const hoje = new Date();
    const diasParaVencimento = Math.ceil(
      (dataVencimento - hoje) / (1000 * 60 * 60 * 24)
    );

    if (diasParaVencimento <= 0) {
      return { cor: "vermelho" };
    } else if (diasParaVencimento <= 4) {
      return { cor: "amarelo" };
    } else if (diasParaVencimento <= 7) {
      return { cor: "azul" };
    }
    return {};
  };

  const criarMensagemVencimento = (dataVencimento) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    dataVencimento.setHours(0, 0, 0, 0);

    const diasParaVencimento = Math.ceil(
      (dataVencimento - hoje) / (1000 * 60 * 60 * 24)
    );

    if (diasParaVencimento < 0) {
      return `Essa despesa venceu há ${Math.abs(diasParaVencimento)} dia${
        Math.abs(diasParaVencimento) === 1 ? "" : "s"
      }.`;
    } else if (diasParaVencimento === 0) {
      return "Essa despesa vence hoje.";
    } else {
      return `Essa despesa vence em ${diasParaVencimento} dia${
        diasParaVencimento === 1 ? "" : "s"
      }.`;
    }
  };

  const marcarDespesaComoPaga = async (id) => {
    try {
      await marcarComoPaga(id);
      setAvisos((prevAvisos) => prevAvisos.filter((aviso) => aviso.id !== id));
    } catch (error) {
      console.error("Erro ao marcar como paga:", error);
    }
  };

  const fecharAviso = (id) => {
    setAvisos((prevAvisos) => prevAvisos.filter((aviso) => aviso.id !== id));
  };

  return (
    <div className="avisos-container">
      {avisos.map((aviso) => (
        <div key={aviso.id} className={`aviso-card ${aviso.estilo.cor}`}>
          <img src="/img/alerta.gif" alt="Alerta" className="icone-alerta2" />
          <button
            className="fechar-aviso"
            onClick={() => fecharAviso(aviso.id)}
          >
            x
          </button>
          <h4>{aviso.titulo}</h4>
          <p>{aviso.descricao}</p>
          <p>
            Valor:{" "}
            {parseFloat(aviso.valor).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p>
            Vencimento:{" "}
            {new Date(aviso.data + "T00:00:00").toLocaleDateString("pt-BR")}
          </p>
          <p>{aviso.mensagemVencimento}</p>
          <button
            className="botao-pago"
            onClick={() => marcarDespesaComoPaga(aviso.id)}
          >
            Já Paguei
          </button>
        </div>
      ))}
    </div>
  );
}

export default Avisos;
