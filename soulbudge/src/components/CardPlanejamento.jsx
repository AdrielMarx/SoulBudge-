import { Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../contexts/UserContext";
import { listarDespesas } from "../firebase/despesa";
import { getPlanejamentoByMes } from "../firebase/planejamento";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

function CardPlanejamento({ mesAtual }) {
  const [despesaReal, setDespesaReal] = useState(0);
  const [planejamento, setPlanejamento] = useState(null);
  const usuario = useContext(UsuarioContext);

  useEffect(() => {
    async function carregarDados() {
      if (usuario) {
        const mesNome = meses[mesAtual];

        const planejamentoDoMes = await getPlanejamentoByMes(
          usuario.uid,
          mesNome
        );
        setPlanejamento(planejamentoDoMes);

        if (planejamentoDoMes) {
          const despesas = await listarDespesas(usuario.uid);
          const totalDespesas = despesas
            .filter((d) => new Date(d.data).getMonth() === mesAtual)
            .reduce((acc, d) => acc + Number(d.valor), 0);
          setDespesaReal(totalDespesas);
        }
      }
    }
    carregarDados();
  }, [usuario, mesAtual]);

  const mesNome = meses[mesAtual];
  const despesaPlanejada = planejamento
    ? Number(planejamento.despesaProgramada)
    : 0;

  const data = {
    labels: ["Despesa Planejada", "Valor Gasto"],
    datasets: [
      {
        label: "Quanto planejo gastar?",
        data: [despesaPlanejada, 0],
        backgroundColor: "rgba(253, 126, 20, 0.38)",
        borderColor: "#FF4E00",
        borderWidth: 1,
        barThickness: 80,
      },
      {
        label: "Quanto já gastei?",
        data: [0, despesaReal],
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderColor: "red",
        borderWidth: 1,
        barThickness: 80,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: R$ ${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `R$ ${value}`;
          },
        },
      },
    },
  };

  if (!planejamento) {
    return (
      <Container className="d-flex justify-content-center mb-5">
        <Card className="w-100 noplan-dash-card text-center">
          <Card.Header
            as="h5"
            style={{ backgroundColor: "#FF4E00", color: "white" }}
          >{`Planejamento de ${mesNome}`}</Card.Header>
          <Card.Body>
            <Card.Title>Nenhum planejamento encontrado</Card.Title>
            <Link to="/planejamento/novo">
              <Button
                className="mt-3 w-50"
                style={{ backgroundColor: "#FF4E00", border: "#FF4E00" }}
              >
                Criar Planejamento
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="d-flex justify-content-center dash-card-container mt-3 mb-5">
      <Card className="dash-card text-center">
        <Card.Header
          as="h4"
          style={{ backgroundColor: "#FF4E00", color: "white" }}
        >{`Planejamento de ${mesNome}`}</Card.Header>
        <Card.Body>
          <Card.Title>Resumo do Planejamento</Card.Title>
          <Card.Text>
            <strong>Valor Gasto:</strong> R$ {despesaReal.toFixed(2)}
            <br />
            <strong>Despesa Planejada:</strong> R$ {despesaPlanejada.toFixed(2)}
          </Card.Text>
          <Bar data={data} options={options} />
          <Link to={`/planejamento/${planejamento.id}`}>
            <Button
              variant="primary"
              className="mt-4 w-50"
              style={{ backgroundColor: "#FF4E00", border: "#FF4E00" }}
            >
              Ver Detalhes
            </Button>
          </Link>
          <Link to={`/planejamento/novo`}>
            <Button
              variant="primary"
              className="mt-2 w-50 ms-1"
              style={{
                backgroundColor: "white",
                border: "solid 2px #FF4E00",
                color: "#FF4E00",
              }}
            >
              Criar para outro mês
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CardPlanejamento;
