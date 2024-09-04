import { useForm } from "react-hook-form";
import { getDespesa, updateDespesa } from "../firebase/despesa";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UsuarioContext } from "../contexts/UserContext";
import "../styles/EditarDespesa.css";

function EditarDespesa() {
  const { id } = useParams();
  const usuario = useContext(UsuarioContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  function carregarDespesa() {
    getDespesa(id).then((dados) => {
      if (dados) {
        reset(dados);
      } else {
        navigate("/financas/editardespesa");
      }
    });
  }

  function atualizarDespesa(data) {
    updateDespesa(id, data)
      .then(() => {
        toast.success("Atualização feita com sucesso!");
        navigate("/financas/despesa");
      })
      .catch(() => {
        toast.error("Erro ao atualizar despesa.");
      });
  }

  useEffect(() => {
    carregarDespesa();
  }, [id]);

  if (usuario === null) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="editar-despesa-container">
      <div className="editar-despesa-card">
        <h1 className="editar-despesa-title">Editar Despesa</h1>
        <hr />
        <form onSubmit={handleSubmit(atualizarDespesa)}>
          <div className="form-group-editar">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              {...register("titulo", { required: true, maxLength: 50 })}
            />
            {errors.titulo && <small className="error">Título inválido</small>}
          </div>
          <div className="form-group-editar">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              {...register("descricao", { required: true, maxLength: 200 })}
            ></textarea>
            {errors.descricao && (
              <small className="error">Descrição inválida</small>
            )}
          </div>
          <div className="form-group-editar">
            <label htmlFor="valor">Valor</label>
            <input
              type="number"
              id="valor"
              {...register("valor", { required: true })}
              step="0.01"
            />
            {errors.valor && <small className="error">Valor inválido</small>}
          </div>
          <div className="form-group-editar">
            <label htmlFor="data">Data de Vencimento</label>
            <input
              type="date"
              id="data"
              {...register("data", { required: true })}
            />
            {errors.data && <small className="error">Data inválida</small>}
          </div>
          <div className="form-group-editar">
            <label htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              {...register("categoria", { required: true })}
            >
              <option value="Aluguel">Aluguel</option>
              <option value="Consumo-de-Agua">Consumo de Água</option>
              <option value="Consumo-de-Energia">Consumo de Energia</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Transporte">Transporte</option>
              <option value="Internet-telefonia">Internet ou telefonia</option>
              <option value="Saude">Saúde</option>
              <option value="Educacao">Educação</option>
              <option value="Lazer">Lazer</option>
              <option value="Seguros">Seguros</option>
              <option value="Outros">Outros</option>
            </select>
            {errors.categoria && (
              <small className="error">Categoria inválida</small>
            )}
          </div>
          <button type="submit">Atualizar Despesa</button>
        </form>
      </div>
    </div>
  );
}

export default EditarDespesa;
