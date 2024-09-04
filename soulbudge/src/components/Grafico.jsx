import React from "react";
import "../styles/Grafico.css";

const Grafico = ({ receitas, despesas }) => {
  const alturaMaxima = 140;
  const total = receitas + despesas;
  const alturaReceitas = (receitas / total) * alturaMaxima;
  const alturaDespesas = (despesas / total) * alturaMaxima;
  const balanco = receitas - despesas;

  function formatarValor(valor) {
    return (
      <>
        <span className="moeda">R$</span>
        <span className="valor">{valor}</span>
      </>
    );
  }

  console.log(alturaDespesas, alturaReceitas);

  return (
    <div className="grafico-container">
      <div className="grafico-flex">
        <div className="barras-container">
          <div
            className="barra barra-receitas"
            style={{ height: `${alturaReceitas}px` }}
          />
          <div
            className="barra barra-despesas"
            style={{ height: `${alturaDespesas}px` }}
          />
        </div>
        <div className="info-container">
          <div className="info-linha">
            <span>Receitas</span>
            <span className="info-valor positivo">
              {formatarValor(receitas.toFixed(2))}
            </span>
          </div>
          <div className="info-linha">
            <span>Despesas</span>
            <span className="info-valor negativo">
              {formatarValor(despesas.toFixed(2))}
            </span>
          </div>
          <hr />
          <div className="info-linha">
            <span>Balanço</span>
            <span className="info-valor">
              {formatarValor(balanco.toFixed(2))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grafico;
