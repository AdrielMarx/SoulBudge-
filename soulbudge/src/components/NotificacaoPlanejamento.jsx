import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { UsuarioContext } from "../contexts/UserContext";
import { listarDespesas } from "../firebase/despesa";
import { getPlanejamentoByMes } from "../firebase/planejamento";
import "../styles/NotificacaoPlanejamento.css";

function NotificacaoPlanejamento({ mesAtual }) {
  const [mostrarNotificacao, setMostrarNotificacao] = useState(false);
  const [percentual, setPercentual] = useState(0);
  const [posicao, setPosicao] = useState({ top: "10%", left: "10%" });
  const usuario = useContext(UsuarioContext);

  useEffect(() => {
    const handleScroll = () => {
      setPosicao({
        top: `${window.scrollY + window.innerHeight * 0.1}px`,
        left: `${window.scrollX + window.innerWidth * 0.1}px`,
      });
    };

    if (mostrarNotificacao) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mostrarNotificacao]);

  useEffect(() => {
    console.log("nplanejamento");
    const verificarNotificacao = async () => {
      if (usuario) {
        const mesNome = [
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
        ][mesAtual];
        const planejamento = await getPlanejamentoByMes(usuario.uid, mesNome);

        if (planejamento) {
          const despesas = await listarDespesas(
            usuario.uid,
            mesAtual + 1,
            new Date().getFullYear()
          );
          const totalDespesas = despesas.reduce(
            (acc, d) => acc + Number(d.valor),
            0
          );
          const despesaPlanejada = Number(planejamento.despesaProgramada);

          if (totalDespesas === 0) {
            setMostrarNotificacao(false);
            return;
          }

          if (despesaPlanejada > 0) {
            const perc = (totalDespesas / despesaPlanejada) * 100;
            setPercentual(perc);

            setMostrarNotificacao(perc >= 70);
          } else {
            setMostrarNotificacao(false);
          }
        } else {
          setMostrarNotificacao(false);
        }
      }
    };
    verificarNotificacao();
  }, [usuario, mesAtual]);

  if (!mostrarNotificacao) {
    return null;
  }

  return (
    <Card
      className="notificacao-planejamento-card piscar"
      style={{ top: posicao.top, left: posicao.left, position: "absolute" }}
    >
      <Card.Body>
        <Card.Title>Alerta de Planejamento</Card.Title>
        <Card.Text>
          Sua despesa já atingiu {percentual.toFixed(2)}% do valor planejado
          para este mês.
        </Card.Text>
        <Button
          className="Botao-Fechar"
          variant="secondary"
          onClick={() => setMostrarNotificacao(false)}
        >
          Fechar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default NotificacaoPlanejamento;
