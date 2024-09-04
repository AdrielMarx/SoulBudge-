import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { adicionarDespesa } from "../firebase/despesa";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { UsuarioContext } from "../contexts/UserContext";
import "../styles/NovaDespesa.css";

function NovaDespesa() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const usuario = useContext(UsuarioContext);

  function salvarDespesa(data) {
    data.idUsuario = usuario.uid;
    data.tipo = "despesa";
    adicionarDespesa(data)
      .then(() => {
        toast.success("Despesa adicionada com sucesso!");
        navigate("/financas");
      })
      .catch(() => {
        toast.error("Um erro aconteceu ao adicionar a renda!");
      });
  }

  if (usuario === null) {
    return <Navigate to={"/login"} />;
  }

  return (
    <main className="nova-despesa-container">
      <div className="nova-despesa-card">
        <h1 className="titulo-nova-despesa">Nova Despesa</h1>
        <hr />
        <form onSubmit={handleSubmit(salvarDespesa)}>
          <div className="form-group-despesa">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              {...register("titulo", { required: true, maxLength: 50 })}
            />
            {errors.titulo && <small className="error">Título inválido</small>}
          </div>
          <div className="form-group-despesa">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              {...register("descricao", { required: true, maxLength: 200 })}
            ></textarea>
            {errors.descricao && (
              <small className="error">Descrição inválida</small>
            )}
          </div>
          <div className="form-group-despesa">
            <label htmlFor="valor">Valor</label>
            <input
              type="number"
              id="valor"
              {...register("valor", { required: true })}
              step="0.01"
            />
            {errors.valor && <small className="error">Valor inválido</small>}
          </div>
          <div className="form-group-despesa">
            <label htmlFor="data">Data de Vencimento</label>
            <input
              type="date"
              id="data"
              {...register("data", { required: true })}
            />
            {errors.data && <small className="error">Data inválida</small>}
          </div>
          <div className="form-group-despesa">
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
          <button type="submit">Salvar Despesa</button>
        </form>
      </div>
    </main>
  );
}

export default NovaDespesa;
