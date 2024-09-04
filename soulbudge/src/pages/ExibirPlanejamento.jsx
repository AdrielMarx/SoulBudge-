import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { UsuarioContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import {
  deletePlanejamento,
  getplanejamento,
  getPlanejamentos,
} from "../firebase/planejamento";
import {
  Button,
  Card,
  CardGroup,
  Container,
  ProgressBar,
  Form,
} from "react-bootstrap";
import "../styles/Planejamento.css";
import { listarDespesas } from "../firebase/despesa";
import toast from "react-hot-toast";

function ExibirPlanejamento() {
  const { id } = useParams();
  const usuario = useContext(UsuarioContext);
  const navigate = useNavigate();
  const [planejamento, setPlanejamento] = useState(null);
  const [renda, setRenda] = useState(0);
  const [despesasReais, setDespesasReais] = useState(0);
  const [despesaProgramada, setDespesaProgramada] = useState(0);
  const [balanco, setBalanco] = useState(0);
  const [despesasPlanejadasPorCategoria, setDespesasPlanejadasPorCategoria] =
    useState({});
  const [despesasReaisPorCategoria, setDespesasReaisPorCategoria] = useState(
    {}
  );
  const [planejamentosDisponiveis, setPlanejamentosDisponiveis] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  async function carregarPlanejamento() {
    if (usuario) {
      const plan = await getplanejamento(id);
      if (plan) {
        setPlanejamento(plan);
        setSelectedMonth(plan.id);
      } else {
        navigate("/financas");
      }
    }
  }

  function carregarValores() {
    if (planejamento) {
      setRenda(Number(planejamento.renda) || 0);
      setDespesaProgramada(Number(planejamento.despesaProgramada) || 0);

      const despesasPlanejadas = planejamento.despesas.reduce(
        (acc, despesa) => {
          if (!acc[despesa.categoria]) {
            acc[despesa.categoria] = 0;
          }
          acc[despesa.categoria] += Number(despesa.valor || 0);
          return acc;
        },
        {}
      );

      setDespesasPlanejadasPorCategoria(despesasPlanejadas);

      const rendaNum = Number(planejamento.renda) || 0;
      const despesaProgramadaNum = Number(planejamento.despesaProgramada) || 0;
      setBalanco(
        rendaNum !== 0
          ? ((rendaNum - despesaProgramadaNum) / rendaNum) * 100
          : 0
      );
    }
  }

  const calcularValoresDespesas = async () => {
    if (!usuario || !planejamento) return;

    try {
      const despesas = await listarDespesas(usuario.uid);

      const despesasPorCategoria = {};
      let totalDespesaDoMes = 0;

      const meses = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ];

      despesas.forEach((despesa) => {
        const valor = parseFloat(despesa.valor);
        const dataDespesa = new Date(despesa.data);
        const mesDespesa = meses[dataDespesa.getMonth()].toLowerCase();

        if (!isNaN(valor) && mesDespesa === planejamento.mes.toLowerCase()) {
          if (!despesasPorCategoria[despesa.categoria]) {
            despesasPorCategoria[despesa.categoria] = 0;
          }
          despesasPorCategoria[despesa.categoria] += valor;

          totalDespesaDoMes += valor;
        }
      });

      setDespesasReaisPorCategoria(despesasPorCategoria);
      setDespesasReais(totalDespesaDoMes);
    } catch (error) {
      console.error("Erro ao carregar despesas reais:", error);
    }
  };

  function apagarPlanejamento(id) {
    const deletar = confirm(
      "Tem certeza que deseja excluir esse planejamento?"
    );
    if (deletar) {
      deletePlanejamento(id)
        .then(() => {
          toast.success("Planejamento removido com sucesso!");
          setTimeout(() => {
            navigate("/financas");
          }, 1000);
        })
        .catch((error) => {
          toast.error("Erro ao remover transação.");
        });
    }
  }

  async function carregarPlanejamentosDisponiveis() {
    if (usuario) {
      const planejamentos = await getPlanejamentos(usuario.uid);
      setPlanejamentosDisponiveis(planejamentos);
    }
  }

  const handleMonthChange = (e) => {
    const selectedPlanejamentoId = e.target.value;
    setSelectedMonth(selectedPlanejamentoId);
    if (selectedPlanejamentoId) {
      navigate(`/planejamento/${selectedPlanejamentoId}`);
    }
  };

  useEffect(() => {
    console.log("exibplanejamento");
    if (usuario) {
      carregarPlanejamento();
      carregarPlanejamentosDisponiveis();
    }
  }, [usuario, id]);

  useEffect(() => {
    if (planejamento) {
      carregarValores();
      calcularValoresDespesas();
    }
  }, [planejamento]);

  useEffect(() => {
    if (id) {
      setSelectedMonth(id);
    }
  }, [id]);

  if (!planejamento) {
    return <div>Carregando...</div>;
  }

  if (usuario === null) {
    return <Navigate to="/financas" />;
  }

  return (
    <main>
      <h1 className="plan-titulo mt-4">
        Planejamento do mês {planejamento.mes}
      </h1>
      <Container className="d-flex justify-content-center align-items-center mt-4">
        <Form.Group
          className="mb-3"
          controlId="formMonthSelect"
          style={{ width: "300px" }}
        >
          <Form.Label as="h3" style={{ color: "white" }}>
            Selecione outro mês:
          </Form.Label>
          <Form.Control
            as="select"
            value={selectedMonth || ""}
            onChange={handleMonthChange}
            style={{ backgroundColor: "rgba(253, 126, 20, 0.38)" }}
          >
            <option value="" disabled>
              Selecione:
            </option>
            {planejamentosDisponiveis.map((planejamento) => (
              <option key={planejamento.id} value={planejamento.id}>
                {planejamento.mes}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Container>
      <div className="valores-cards mt-3 mb-3">
        <div className="valores-card">
          <h4>Renda do mês</h4>
          <h5>R$ {renda.toFixed(2)}</h5>
        </div>
        <div className="valores-card">
          <h4>Quanto quero gastar</h4>
          <h5>R$ {despesaProgramada.toFixed(2)}</h5>
        </div>
        <div className="valores-card">
          <h4>Quando já gastei</h4>
          <h5>R$ {despesasReais.toFixed(2)}</h5>
        </div>
        <div className="valores-card">
          <h4>Economia</h4>
          <h5>{balanco.toFixed(1)}%</h5>
        </div>
      </div>
      <Container>
        <h2 className="plan-titulo">Comparativo de despesas</h2>
        <section className="mt-4 mb-4 despesas-display">
          {Object.keys({
            ...despesasPlanejadasPorCategoria,
            ...despesasReaisPorCategoria,
          }).map((categoria) => {
            const despesaPlanejada =
              despesasPlanejadasPorCategoria[categoria] || 0;
            const despesaReal = despesasReaisPorCategoria[categoria] || 0;

            return (
              <div className="card-mae" key={categoria}>
                <h3 className="text-center" style={{ color: "#ff4e00" }}>
                  {categoria}
                </h3>
                {(() => {
                  const percentage =
                    despesaPlanejada === 0
                      ? 100
                      : (despesaReal / despesaPlanejada) * 100;
                  const variant = percentage < 80 ? "warning" : "danger";

                  return (
                    <ProgressBar
                      now={percentage}
                      max={100}
                      label={`${percentage.toFixed(
                        0
                      )}% (R$ ${despesaReal.toFixed(2)})`}
                      className="mb-3"
                      variant={variant}
                    />
                  );
                })()}
                <CardGroup className="cards-internos">
                  <Card
                    className="text-center card-interno"
                    style={{ backgroundColor: "rgba(253, 126, 20, 0.38)" }}
                  >
                    <Card.Body>
                      <Card.Title>Quanto já gastei</Card.Title>
                      <Card.Text>R$ {despesaReal.toFixed(2)}</Card.Text>
                    </Card.Body>
                  </Card>
                  <Card
                    className="text-center card-interno"
                    style={{ backgroundColor: "rgba(253, 126, 20, 0.38)" }}
                  >
                    <Card.Body>
                      <Card.Title>Quanto pretendo gastar</Card.Title>
                      <Card.Text>R$ {despesaPlanejada.toFixed(2)}</Card.Text>
                    </Card.Body>
                  </Card>
                </CardGroup>
              </div>
            );
          })}
        </section>
        <Link to={`/planejamento/editar/${id}`}>
          <Button
            className="w-100 mt-3"
            size="lg"
            style={{
              backgroundColor: "white",
              color: "#FF4E00",
              border: "solid 2px #FF4E00",
            }}
          >
            Editar esse planejamento
          </Button>
        </Link>
        <Button
          className="w-100 mt-2 mb-4"
          size="lg"
          variant="danger"
          onClick={() => apagarPlanejamento(id)}
        >
          Excluir esse planejamento
        </Button>
      </Container>
    </main>
  );
}

export default ExibirPlanejamento;
