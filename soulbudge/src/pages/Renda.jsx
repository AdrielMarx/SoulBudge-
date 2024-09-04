import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deletarTransacao, getTransacoesUsuario } from "../firebase/transacao";
import { useEffect, useState, useContext } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { UsuarioContext } from "../contexts/UserContext";
import {
  AiOutlinePlus,
  AiOutlineDollarCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import "../styles/Renda.css";

function ListagemRendas() {
  const [transacoes, setTransacoes] = useState(null);
  const usuario = useContext(UsuarioContext);

  function carregarRendas() {
    if (usuario) {
      getTransacoesUsuario(usuario.uid)
        .then((dados) => {
          setTransacoes(dados);
        })
        .catch((error) => {
          console.error("Erro ao carregar rendas:", error);
          toast.error("Erro ao carregar rendas.");
        });
    }
  }

  function apagarTransacao(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      deletarTransacao(id)
        .then(() => {
          toast.success("Transação removida com sucesso!");
          carregarRendas();
        })
        .catch((error) => {
          console.error("Erro ao deletar transação:", error);
          toast.error("Erro ao remover transação.");
        });
    }
  }

  useEffect(() => {
    if (usuario) {
      carregarRendas();
    }
  }, [usuario]);

  return (
    <main className="mt-4-personalizado container-personalizado">
      <h1 className="titulo-personalizado">Lista de Rendas</h1>
      <div className="d-flex flex-column flex-md-row justify-content-md-between">
        <Button
          as={Link}
          to="/financas/renda/novarenda"
          className="botao-personalizado botao-sucesso-personalizado mb-3 me-md-3"
          variant="success"
        >
          <AiOutlinePlus className="me-2 mb-1" /> Adicionar Renda
        </Button>
        <Button
          as={Link}
          to="/financas"
          className="botao-personalizado botao-primario-personalizado mb-3"
          variant="primary"
        >
          <AiOutlineDollarCircle className="me-2 mb-1" /> Menu Principal
        </Button>
      </div>
      {transacoes ? (
        <Table
          className="tabela-personalizada"
          striped
          bordered
          hover
          responsive
        >
          <thead>
            <tr>
              <th className="cabecalho-tabela-personalizado">Título</th>
              <th className="cabecalho-tabela-personalizado">Descrição</th>
              <th className="cabecalho-tabela-personalizado">Valor</th>
              <th className="cabecalho-tabela-personalizado">Data</th>
              <th className="cabecalho-tabela-personalizado">Categoria</th>
              <th className="cabecalho-tabela-personalizado">Ações</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((transacao, index) => (
              <tr
                key={transacao.id}
                className={
                  index % 2 === 0 ? "linha-par-tabela-personalizado" : ""
                }
              >
                <td className="celula-tabela-personalizada">
                  {transacao.titulo}
                </td>
                <td className="celula-tabela-personalizada">
                  {transacao.descricao}
                </td>
                <td className="celula-tabela-personalizada">
                  {parseFloat(transacao.valor).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="celula-tabela-personalizada">
                  {new Date(transacao.data + "T00:00:00").toLocaleDateString(
                    "pt-BR"
                  )}
                </td>
                <td className="celula-tabela-personalizada">
                  {transacao.categoria}
                </td>
                <td className="celula-tabela-personalizada">
                  <Button
                    className="botao-personalizado botao-perigo-personalizado me-3 mb-2 mb-md-0"
                    variant="danger"
                    onClick={() => apagarTransacao(transacao.id)}
                  >
                    <AiOutlineDelete className="me-2 mb-1" /> Excluir
                  </Button>
                  <Button
                    className="botao-personalizado botao-aviso-personalizado"
                    as={Link}
                    to={`/financas/editar/${transacao.id}`}
                    variant="warning"
                  >
                    <AiOutlineEdit className="me-2 mb-1" /> Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Loader />
      )}
    </main>
  );
}

export default ListagemRendas;
