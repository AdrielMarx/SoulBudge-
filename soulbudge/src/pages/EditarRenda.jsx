import { Button, Card, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { getTransacao, updateTransacao } from "../firebase/transacao";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UsuarioContext } from "../contexts/UserContext";
import "../styles/EditarRenda.css";

function EditarRenda() {
  const { id } = useParams();
  const usuario = useContext(UsuarioContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  function carregarRenda() {
    getTransacao(id).then((dados) => {
      if (dados) {
        reset(dados);
      } else {
        navigate("/financas/renda");
      }
    });
  }

  function atualizarRenda(data) {
    updateTransacao(id, data)
      .then(() => {
        toast.success("Atualização feita com sucesso!");
        navigate("/financas/renda");
      })
      .catch(() => {
        toast.error("Erro ao atualizar renda.");
      });
  }

  useEffect(() => {
    carregarRenda();
  }, [id]);

  if (usuario === null) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="editar-renda-container">
      <div className="editar-renda-card">
        <h1 className="editar-renda-title">Editar Renda</h1>
        <hr />
        <form onSubmit={handleSubmit(atualizarRenda)}>
          <div className="form-group-editar-renda">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              {...register("titulo", { required: true, maxLength: 50 })}
            />
            {errors.titulo && <small className="error">Título inválido</small>}
          </div>
          <div className="form-group-editar-renda">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              {...register("descricao", { required: true, maxLength: 200 })}
            ></textarea>
            {errors.descricao && (
              <small className="error">Descrição inválida</small>
            )}
          </div>
          <div className="form-group-editar-renda">
            <label htmlFor="valor">Valor</label>
            <input
              type="number"
              id="valor"
              {...register("valor", { required: true })}
              step="0.01"
            />
            {errors.valor && <small className="error">Valor inválido</small>}
          </div>
          <div className="form-group-editar-renda">
            <label htmlFor="data">Data</label>
            <input
              type="date"
              id="data"
              {...register("data", { required: true })}
            />
            {errors.data && <small className="error">Data inválida</small>}
          </div>
          <div className="form-group-editar-renda">
            <label htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              {...register("categoria", { required: true })}
            >
              <option value="Salário">Salário</option>
              <option value="Freelance">Freelance</option>
              <option value="Investimentos">Investimentos</option>
              <option value="Outros">Outros</option>
            </select>
            {errors.categoria && (
              <small className="error">Categoria inválida</small>
            )}
          </div>
          <Button variant="success" type="submit" className="w-100">
            Atualizar Renda
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditarRenda;
