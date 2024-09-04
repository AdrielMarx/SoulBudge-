import { Button, Card, Container, ProgressBar } from "react-bootstrap";
import { getplanejamento, updateplanejamento } from "../firebase/planejamento";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { UsuarioContext } from "../contexts/UserContext";

function EditarPlanejamento() {
  const {
    register,
    control,
    reset,
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
  const navigate = useNavigate();
  const { id } = useParams();

  function carregarPlanejamento() {
    if (usuario) {
      getplanejamento(id).then((plan) => {
        if (plan) {
          reset(plan);
        } else {
          navigate("/financas");
        }
      });
    }
  }

  function atualizarPlanejamento(data) {
    updateplanejamento(id, data)
      .then(() => {
        toast.success("Planejamento editado com sucesso!");
        setTimeout(() => {
          navigate(`/planejamento/${id}`);
        }, 1000);
      })
      .catch((erro) => {
        toast.error("Erro ao editar o planejamento.");
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

  if (!usuario) {
    navigate("/login");
  }

  useEffect(() => {
    console.log("editplanejamento");
    const total = despesas.reduce(
      (acumulador, despesa) => acumulador + Number(despesa.valor || 0),
      0
    );
    setSomaDespesas(total);
  }, [despesas]);

  useEffect(() => {
    console.log("editplanejamento2");
    carregarPlanejamento();
  }, []);

  return (
    <main>
      <h1 className="plan-titulo mt-3">Editar planejamento mensal</h1>
      <Container
        className="d-flex justify-content-center align-items-center mt-3 mb-4"
        style={{ minHeight: "100vh" }}
      >
        <Card
          style={{ width: "400px", padding: "20px" }}
          className="editcreate-card"
        >
          <form onSubmit={handleSubmit(atualizarPlanejamento)}>
            <div>
              <label htmlFor="mes">Mês</label>
              <input
                id="mes"
                type="text"
                className="form-control"
                value={watch("mes")}
                readOnly
                style={{ backgroundColor: "rgba(253, 126, 20, 0.38)" }}
              />
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
              style={{
                backgroundColor: "rgba(253, 126, 20, 0.38)",
                color: "#FF4E00",
              }}
              now={Math.min(porcentagemGasta, 100)}
              label={`${Math.min(porcentagemGasta, 100).toFixed(2)}%`}
            />
            {fields.map((field, index) => (
              <div key={field.id} className="mb-1 mt-4">
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

export default EditarPlanejamento;
