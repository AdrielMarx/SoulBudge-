import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  deletarDespesa,
  getDespesasUsuario,
  atualizarStatusDespesa,
} from "../firebase/despesa";
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
import { FaCheckCircle } from "react-icons/fa";
import "../styles/Despesa.css";

function ListagemDespesas() {
  const [despesas, setDespesas] = useState(null);
  const usuario = useContext(UsuarioContext);

  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  function carregarDespesas() {
    if (usuario) {
      getDespesasUsuario(usuario.uid)
        .then((dados) => {
          setDespesas(dados);
        })
        .catch((error) => {
          console.error("Erro ao carregar despesas:", error);
          toast.error("Erro ao carregar despesas.");
        });
    }
  }

  function apagarDespesa(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      deletarDespesa(id)
        .then(() => {
          toast.success("Despesa removida com sucesso!");
          carregarDespesas();
        })
        .catch((error) => {
          console.error("Erro ao deletar despesa:", error);
          toast.error("Erro ao remover despesa.");
        });
    }
  }

  function alternarStatusDespesa(id, statusAtual) {
    const novoStatus = !statusAtual;
    atualizarStatusDespesa(id, novoStatus)
      .then(() => {
        toast.success(
          `Despesa marcada como ${novoStatus ? "paga" : "pendente"}`
        );
        carregarDespesas();
      })
      .catch((error) => {
        console.error("Erro ao atualizar status da despesa:", error);
        toast.error("Erro ao atualizar status da despesa.");
      });
  }

  useEffect(() => {
    if (usuario) {
      carregarDespesas();
    }
  }, [usuario]);

  return (
    <main className="container-despesas mt-4-despesas">
      <h1 className="titulo-despesas">Lista de Despesas</h1>
      <div className="d-flex flex-column flex-md-row justify-content-md-between">
        <Button
          as={Link}
          to="/financas/despesa/novadespesa"
          className="botao-despesas botao-sucesso-despesas mb-3 me-md-3"
          variant="success"
        >
          <AiOutlinePlus className="me-2 mb-1" /> Adicionar Despesa
        </Button>
        <Button
          as={Link}
          to="/financas"
          className="botao-despesas botao-primario-despesas mb-3"
          variant="primary"
        >
          <AiOutlineDollarCircle className="me-2 mb-1" /> Menu Principal
        </Button>
      </div>
      {despesas ? (
        <Table className="tabela-despesas" striped bordered hover responsive>
          <thead>
            <tr>
              <th className="cabecalho-tabela-despesas">Título</th>
              <th className="cabecalho-tabela-despesas">Descrição</th>
              <th className="cabecalho-tabela-despesas">Valor</th>
              <th className="cabecalho-tabela-despesas">Data</th>
              <th className="cabecalho-tabela-despesas">Categoria</th>
              <th className="cabecalho-tabela-despesas">Status</th>
              <th className="cabecalho-tabela-despesas">Ações</th>
            </tr>
          </thead>
          <tbody>
            {despesas.map((despesa, index) => (
              <tr
                key={despesa.id}
                className={`${
                  index % 2 === 0 ? "linha-par-tabela-despesas" : ""
                } linha-hover-tabela-despesas`}
              >
                <td className="celula-tabela-despesas">{despesa.titulo}</td>
                <td className="celula-tabela-despesas">{despesa.descricao}</td>
                <td className="celula-tabela-despesas">
                  {formatarMoeda(parseFloat(despesa.valor))}
                </td>
                <td className="celula-tabela-despesas">
                  {new Date(despesa.data + "T00:00:00").toLocaleDateString(
                    "pt-BR"
                  )}
                </td>
                <td className="celula-tabela-despesas">{despesa.categoria}</td>
                <td className="celula-tabela-despesas">
                  {despesa.paga ? "Pago" : "Pendente"}
                </td>
                <td className="celula-tabela-despesas">
                  <div className="container-acoes">
                    <Button
                      className="botao-despesas botao-aviso-despesas me-3 mb-2 mb-md-0"
                      as={Link}
                      to={`/financas/editardespesa/${despesa.id}`}
                      variant="warning"
                    >
                      <AiOutlineEdit className="mb-1" /> Editar
                    </Button>
                    <Button
                      className="botao-despesas botao-perigo-despesas me-3 mb-2 mb-md-0"
                      variant="danger"
                      onClick={() => apagarDespesa(despesa.id)}
                    >
                      <AiOutlineDelete className="mb-1" /> Excluir
                    </Button>
                    <Button
                      className="botao-despesas botao-despesa-card"
                      variant={despesa.paga ? "secondary" : "success"}
                      onClick={() =>
                        alternarStatusDespesa(despesa.id, despesa.paga)
                      }
                    >
                      <FaCheckCircle className="mb-1" />
                      {despesa.paga ? "Pendente" : "Pago   "}
                    </Button>
                  </div>
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

export default ListagemDespesas;
