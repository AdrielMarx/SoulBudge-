import { useForm } from "react-hook-form";
import { adicionarTransacao } from "../firebase/transacao";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsuarioContext } from "../contexts/UserContext";
import "../styles/NovaRenda.css";

function NovaRenda() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const usuario = useContext(UsuarioContext);

  function salvarRenda(data) {
    data.idUsuario = usuario.uid;
    data.tipo = "receita";
    adicionarTransacao(data)
      .then(() => {
        toast.success("Renda adicionada com sucesso!");
        navigate("/financas/renda");
      })
      .catch(() => {
        toast.error("Um erro aconteceu ao adicionar a renda!");
      });
  }

  if (usuario === null) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="nova-renda-container">
      <div className="nova-renda-card">
        <h1 className="TituloNovaRenda">Nova Renda</h1>
        <hr />
        <form onSubmit={handleSubmit(salvarRenda)}>
          <div className="form-group-renda">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              {...register("titulo", { required: true, maxLength: 50 })}
            />
            {errors.titulo && <small className="error">Título inválido</small>}
          </div>
          <div className="form-group-renda">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              {...register("descricao", { required: true, maxLength: 200 })}
            ></textarea>
            {errors.descricao && (
              <small className="error">Descrição inválida</small>
            )}
          </div>
          <div className="form-group-renda">
            <label htmlFor="valor">Valor</label>
            <input
              type="number"
              id="valor"
              {...register("valor", { required: true })}
              step="0.01"
            />
            {errors.valor && <small className="error">Valor inválido</small>}
          </div>
          <div className="form-group-renda">
            <label htmlFor="data">Data</label>
            <input
              type="date"
              id="data"
              {...register("data", { required: true })}
            />
            {errors.data && <small className="error">Data inválida</small>}
          </div>
          <div className="form-group-renda">
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
          <button type="submit">Salvar Renda</button>
        </form>
      </div>
    </div>
  );
}

export default NovaRenda;
