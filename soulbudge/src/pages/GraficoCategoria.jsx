import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  FaHome,
  FaTint,
  FaLightbulb,
  FaUtensils,
  FaCar,
  FaPhone,
  FaHeartbeat,
  FaEllipsisH,
} from "react-icons/fa";
import { listarDespesas } from "../firebase/despesa";
import { auth } from "../firebase/config";
import "../styles/GraficoCategoria.css";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const GraficoCategoria = ({ mesAtual, anoAtual }) => {
  const [dadosGrafico, setDadosGrafico] = useState({
    labels: [],
    datasets: [],
  });
  const [dadosCategorias, setDadosCategorias] = useState([]);
  const [mostrarTodas, setMostrarTodas] = useState(false);

  const categorias = useMemo(
    () => [
      { nome: "Aluguel", icon: FaHome, cor: "#8B008B" },
      { nome: "Consumo de Água", icon: FaTint, cor: "#3357FF" },
      { nome: "Consumo de Energia", icon: FaLightbulb, cor: "#006400" },
      { nome: "Alimentação", icon: FaUtensils, cor: "#D2691E" },
      { nome: "Transporte", icon: FaCar, cor: "#FF33A6" },
      { nome: "Internet ou Telefonia", icon: FaPhone, cor: "#330066" },
      { nome: "Saúde", icon: FaHeartbeat, cor: "#FF0000" },
      { nome: "Outros", icon: FaEllipsisH, cor: "#3498DB" },
    ],
    []
  );

  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  useEffect(() => {
    const buscarDespesas = async () => {
      const user = auth.currentUser;
      const idUsuario = user ? user.uid : null;

      if (!idUsuario) return;

      try {
        const despesasFiltradas = await listarDespesas(
          idUsuario,
          mesAtual + 1,
          anoAtual
        );

        const categoriasTotais = {};
        despesasFiltradas.forEach((despesa) => {
          const { categoria, valor } = despesa;
          categoriasTotais[categoria] =
            (categoriasTotais[categoria] || 0) + parseFloat(valor);
        });

        setDadosCategorias(
          categorias.map((categoria) => ({
            ...categoria,
            valor: categoriasTotais[categoria.nome] || 0,
          }))
        );

        setDadosGrafico({
          labels: Object.keys(categoriasTotais),
          datasets: [
            {
              data: Object.values(categoriasTotais),
              backgroundColor: categorias.map((categoria) => categoria.cor),
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      }
    };

    buscarDespesas();
  }, [mesAtual, anoAtual, categorias]);

  const totalDespesas = dadosCategorias.reduce(
    (acc, cat) => acc + cat.valor,
    0
  );

  const categoriasExibidas = mostrarTodas
    ? dadosCategorias
    : dadosCategorias.slice(0, 3);

  const performance = useMemo(() => {
    if (totalDespesas < 0) {
      return "negativo";
    } else if (totalDespesas <= 0.05 * totalDespesas) {
      return "neutro";
    } else {
      return "positivo";
    }
  }, [totalDespesas]);

  return (
    <div className={`grafico-categoria-container ${performance}`}>
      {totalDespesas === 0 ? (
        <div className="no-data">
          <img
            src="https://img.freepik.com/vetores-gratis/colecao-de-elementos-infografico-mao-desenhada_23-2148372655.jpg?w=1380&t=st=1724718074~exp=1724718674~hmac=aefd67e4e04e50393cbf83444cda3617f0815639cd5aa6dc937e3c2467f7237d"
            alt="Sem Despesas"
            className="no-data-image"
          />
          <p className="no-data-message">
            Nenhuma despesa foi adicionada até o momento.
          </p>
        </div>
      ) : (
        <>
          <h2 className="tituloGrafico">Despesas por Categorias</h2>
          <div className="grafico-conteudo">
            <div className="legenda-categorias">
              {categorias.map((categoria, index) => (
                <div key={index} className="legenda-item">
                  <div
                    className="cor-quadrado"
                    style={{ backgroundColor: categoria.cor }}
                  ></div>
                  <span className="legenda-nome">{categoria.nome}</span>
                </div>
              ))}
            </div>
            <div className="grafico-container">
              {dadosGrafico.labels.length > 0 &&
              dadosGrafico.datasets.length > 0 ? (
                <Doughnut
                  className="grafico-chart"
                  data={dadosGrafico}
                  options={{
                    cutout: "70%",
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const valor =
                              dadosGrafico.datasets[0].data[context.dataIndex];
                            return `${
                              dadosGrafico.labels[context.dataIndex]
                            }: ${formatarMoeda(valor)}`;
                          },
                        },
                      },
                      datalabels: {
                        display: false,
                      },
                    },
                    layout: {
                      padding: {
                        top: 25,
                        bottom: 25,
                        left: 25,
                        right: 25,
                      },
                    },
                    elements: {
                      arc: {
                        borderWidth: 2,
                        borderColor: "#fff",
                        hoverBorderColor: "#fff",
                        hoverBorderWidth: 3,
                        hoverOffset: 20,
                        hoverBackgroundColor: (context) => {
                          return context.raw
                            ? `${context.backgroundColor}80`
                            : "#fff";
                        },
                      },
                    },
                    hover: {
                      mode: "nearest",
                      intersect: true,
                    },
                  }}
                />
              ) : (
                <p>Carregando dados...</p>
              )}
              <div className={`total-centro ${performance}`}>
                <div className="total-valor">
                  {formatarMoeda(totalDespesas)}
                </div>
                <div className="total-texto">Total</div>
              </div>
            </div>
            <div className="detalhes-categorias">
              <h3>Detalhamento dos Custos</h3>
              {categoriasExibidas.map((categoria, index) => (
                <div
                  key={index}
                  className="categoria-item"
                  style={{ color: categoria.cor }}
                >
                  <div className="categoria-linha">
                    <categoria.icon className="categoria-icon" />
                    <span className="categoria-nome">{categoria.nome}</span>
                  </div>
                  <span className="categoria-valor">
                    Valor Total: {formatarMoeda(categoria.valor)}
                  </span>
                  <span className="categoria-porcentagem">
                    Porcentagem:{" "}
                    {((categoria.valor / totalDespesas) * 100).toFixed(2)}%
                  </span>
                </div>
              ))}
              {dadosCategorias.length > 3 && (
                <div
                  className="veja-mais"
                  onClick={() => setMostrarTodas(!mostrarTodas)}
                >
                  {mostrarTodas ? "Ver menos" : "Veja mais"}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

GraficoCategoria.propTypes = {
  mesAtual: PropTypes.number.isRequired,
  anoAtual: PropTypes.number.isRequired,
};

export default GraficoCategoria;
