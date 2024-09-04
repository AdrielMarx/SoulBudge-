import { useContext, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UsuarioContext } from "../contexts/UserContext";
import { Button, Container, ProgressBar, Card } from "react-bootstrap";
import "../styles/Planejamento.css";
import { addPlanejamento, getPlanejamentos } from "../firebase/planejamento";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function NovoPlanejamento() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { despesas: [{ categoria: "", valor: "" }] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "despesas",
  });
  const usuario = useContext(UsuarioContext);
  const despesaProgramada = watch("despesaProgramada");
  const despesas = watch("despesas");
  const [somaDespesas, setSomaDespesas] = useState(0);
  const [mesesSelecionados, setMesesSelecionados] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  function criarPlanejamento(data) {
    data.idUsuario = usuario.uid;
    addPlanejamento(data)
      .then((resposta) => {
        if (resposta && resposta.id) {
          const planejamentoId = resposta.id;
          toast.success("Novo planejamento criado com sucesso!");

          setTimeout(() => {
            navigate(`/planejamento/${planejamentoId}`);
          }, 1000);
        }
      })
      .catch((erro) => {
        toast.error("Ocorreu um erro, tente novamente!");
      });
  }

  const despesaProgramadaNum = Number(despesaProgramada) || 0;
  const saldoDisponivel = despesaProgramadaNum - somaDespesas;
  const porcentagemGasta = despesaProgramadaNum
    ? (somaDespesas / despesaProgramadaNum) * 100
    : 0;

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

  useEffect(() => {
    console.log("novoplanejamento");
    const total = despesas.reduce(
      (acumulador, despesa) => acumulador + Number(despesa.valor || 0),
      0
    );
    setSomaDespesas(total);
  }, [despesas]);

  useEffect(() => {
    if (usuario) {
      async function carregarMesesSelecionados() {
        const planejamentos = await getPlanejamentos(usuario.uid);
        const meses = planejamentos.map((p) => p.mes);
        setMesesSelecionados(meses);
      }
      carregarMesesSelecionados();
    }
  }, [usuario]);

  if (!usuario) {
    navigate("/login");
    return null;
  }

  return (
    <main>
      <h1 className="plan-titulo mt-3">Criar planejamento mensal</h1>
      <Container
        className="d-flex justify-content-center align-items-center mb-4 mt-3"
        style={{ minHeight: "100vh" }}
      >
        <Card
          style={{ width: "400px", padding: "20px" }}
          className="editcreate-card"
        >
          <form onSubmit={handleSubmit(criarPlanejamento)}>
            <div>
              <label htmlFor="mes">Escolha o mês</label>
              <select
                id="mes"
                className="form-select"
                defaultValue=""
                style={{ backgroundColor: "rgba(253, 126, 20, 0.38)" }}
                {...register("mes", { required: true })}
              >
                <option value="" disabled>
                  Selecione:
                </option>
                {meses.map((mes) => (
                  <option
                    key={mes}
                    value={mes}
                    disabled={mesesSelecionados.includes(mes)}
                  >
                    {mes}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="renda">Quanto vai receber esse mês?</label>
              <input
                type="number"
                id="renda"
                className="form-control"
                {...register("renda", { required: true })}
                style={{ backgroundColor: "rgba(253, 126, 20, 0.38)" }}
              />
              {errors.renda && (
                <small className="text-danger">Valor inválido</small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="despesaProgramada">Quanto pretende gastar?</label>
              <input
                type="number"
                id="despesaProgramada"
                className="form-control"
                {...register("despesaProgramada", { required: true })}
                style={{ backgroundColor: "rgba(253, 126, 20, 0.38)" }}
              />
              {errors.despesaProgramada && (
                <small className="text-danger">Valor inválido</small>
              )}
            </div>
            <h3>Agora vamos dividir os gastos por categoria:</h3>
            <hr className="hr-planejamento" />
            <h4>Seu saldo no momento é R${saldoDisponivel.toFixed(2)}.</h4>
            <ProgressBar
              className="mb-3"
              style={{
                backgroundColor: "rgba(253, 126, 20, 0.38)",
                color: "#FF4E00",
              }}
              now={Math.min(porcentagemGasta, 100)}
              label={`${Math.min(porcentagemGasta, 100).toFixed(2)}%`}
            />
            {fields.map((field, index) => (
              <div key={field.id} className="mb-1 mt-3">
                <select
                  {...register(`despesas.${index}.categoria`, {
                    required: true,
                  })}
                  className="form-control mb-2"
                >
                  <option value="" disabled>
                    Selecione uma categoria:
                  </option>
                  <option value="Aluguel">Aluguel</option>
                  <option value="Consumo-de-Agua">Consumo de Água</option>
                  <option value="Consumo-de-Energia">Consumo de Energia</option>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Internet-telefonia">
                    Internet ou telefonia
                  </option>
                  <option value="Saude">Saúde</option>
                  <option value="Educacao">Educação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Seguros">Seguros</option>
                  <option value="Outros">Outros</option>
                </select>
                <input
                  {...register(`despesas.${index}.valor`, { required: true })}
                  placeholder="Valor"
                  type="number"
                  className="form-control mb-3"
                />
                {errors.despesas && (
                  <small className="text-danger">
                    Adicione pelo menos uma despesa!{" "}
                  </small>
                )}
                <Button
                  type="button"
                  className="w-100"
                  onClick={() => remove(index)}
                  variant="danger"
                >
                  Remover
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append({ categoria: "", valor: "" })}
              className="mb-3 w-100"
            >
              Adicionar outra despesa
            </Button>
            <Button
              type="submit"
              className="w-100"
              style={{ backgroundColor: "#FF4E00", border: "#FF4E00" }}
            >
              Tudo pronto? Clique aqui para salvar!
            </Button>
          </form>
        </Card>
      </Container>
    </main>
  );
}

export default NovoPlanejamento;
