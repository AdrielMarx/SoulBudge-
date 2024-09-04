import "../styles/BalancoMensal.css";
import Grafico from "./Grafico";
import Loader from "./Loader";
import { useEffect, useState, useContext } from "react";
import { UsuarioContext } from "../contexts/UserContext";
import { getTransacoesUsuario } from "../firebase/transacao";
import { getDespesasUsuario } from "../firebase/despesa";
import PropTypes from "prop-types";

function BalancoMensal({ mesSelecionado }) {
  const [transacoes, setTransacoes] = useState(null);
  const [despesas, setDespesas] = useState(null);
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

  useEffect(() => {
    if (usuario) {
      carregarRendas();
      carregarDespesas();
    }
  }, [usuario]);

  const filtrarPorMes = (items) => {
    return items
      ? items.filter((item) => {
          const dataItem = new Date(item.data);
          return dataItem.getMonth() === mesSelecionado;
        })
      : [];
  };

  const entradasDoMes = filtrarPorMes(transacoes);
  const saidasDoMes = filtrarPorMes(despesas);

  const totalEntradas = entradasDoMes.reduce(
    (total, t) => total + parseFloat(t.valor),
    0
  );
  const totalDespesas = saidasDoMes.reduce(
    (total, d) => total + parseFloat(d.valor),
    0
  );
  const total = totalEntradas - totalDespesas;

  return (
    <section className="alinhamento">
      <div className="balanco">
        <h3 className="balancotitle">Balanço Mensal</h3>
        <div className="entradaEdespesas">
          <article className="entradas">
            <h4 className="positivo">Entradas</h4>
            {entradasDoMes.length > 0 ? (
              entradasDoMes.map((transacao) => (
                <div className="separacao" key={transacao.id}>
                  <p>{transacao.titulo}</p>
                  <p className="positivo">+{transacao.valor}</p>
                </div>
              ))
            ) : (
              <p>Nenhuma entrada registrada neste mês.</p>
            )}
          </article>
          <article className="despesas">
            <h4 className="negativo">Despesas</h4>
            {saidasDoMes.length > 0 ? (
              saidasDoMes.map((despesa) => (
                <div className="separacao" key={despesa.id}>
                  <p>{despesa.titulo}</p>
                  <p className="negativo">-{despesa.valor}</p>
                </div>
              ))
            ) : (
              <p>Nenhuma despesa registrada neste mês.</p>
            )}
          </article>
          <article className="grafico">
            <Grafico receitas={totalEntradas} despesas={totalDespesas} />
          </article>
        </div>
        <article className="total">
          <h5>Total</h5>
          {total >= 0 ? (
            <h5 className="positivo">R$ {total.toFixed(2)}</h5>
          ) : (
            <h5 className="negativo">R$ {total.toFixed(2)}</h5>
          )}
        </article>
      </div>
    </section>
  );
}

BalancoMensal.propTypes = {
  mesSelecionado: PropTypes.number.isRequired,
};

export default BalancoMensal;
