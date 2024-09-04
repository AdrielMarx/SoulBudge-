import { Button, Container } from "react-bootstrap";
import { Element, scroller } from "react-scroll";
import "../styles/Planejamento.css";
import { useContext, useEffect, useState } from "react";
import { deletePlanejamento, listPlanejamento } from "../firebase/planejamento";
import { UsuarioContext } from "../contexts/UserContext";
import PlanejamentoPag1 from "../components/PlanejamentoPag1";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Planejamento() {
  const [pagina, setPagina] = useState("pag1");
  const navigate = useNavigate();
  const [renda, setRenda] = useState(0);
  const [despesa, setDespesa] = useState(0);
  const [despesaPlanejada, setDespesaPlanejada] = useState(0);
  const [balanco, setBalanco] = useState(0);
  const usuario = useContext(UsuarioContext);

  function handlePagina(selectPagina) {
    setPagina(selectPagina);
    scroller.scrollTo(selectPagina, {
      smooth: true,
      offset: -100,
    });
  }

  const calcularValores = async () => {
    if (!usuario) return;
    try {
      const transacoes = await listPlanejamento(usuario.uid);

      let ExibirRenda = 0;
      let ExibirDespesa = 0;
      let ExibirDespesaPlanejada = 0;

      transacoes.forEach((transacao) => {
        const valor = parseFloat(transacao.valor);
        if (!isNaN(valor)) {
          if (transacao.tipo === "renda") {
            ExibirRenda += valor;
          } else if (transacao.tipo === "despesaPlanejada") {
            ExibirDespesaPlanejada += valor;
          } else if (transacao.tipo === "despesa") {
            ExibirDespesa += valor;
          }
        }
      });

      setRenda(ExibirRenda);
      setDespesa(ExibirDespesa);
      setDespesaPlanejada(ExibirDespesaPlanejada);
      setBalanco((100 * (ExibirRenda - ExibirDespesaPlanejada)) / ExibirRenda);
    } catch (error) {}
  };

  // function salvarDespesas(data) {
  //     data.idUsuario = usuario.uid;
  //     data.tipo = "despesa";
  //     addPlanejamento(data)
  // }

  function excluirPlanejamento() {
    const deletar = confirm(
      "Tem certeza que deseja excluir o seu planejamento?"
    );
    if (deletar) {
      deletePlanejamento(usuario.uid).then(() => {
        toast.success("Planejamento removido com sucesso!");
        navigate("/financas");
        calcularValores();
      });
    }
  }

  if (usuario === null) {
    return <Navigate to={"/login"} />;
  }

  // const economiaPlanejada = x

  useEffect(() => {
    calcularValores();
  }, [pagina]);

  return (
    <main>
      <h1 className="plan-titulo">Planejamento de gastos</h1>
      <div className="valores-cards mt-3 mb-4">
        <div className="valores-card">
          <h4>Receitas do mês</h4>
          <h5>R$ {renda.toFixed(2)}</h5>
        </div>
        <div className="valores-card">
          <h4>Gastos planejados</h4>
          <h5>R$ {despesaPlanejada.toFixed(2)}</h5>
        </div>
        <div className="valores-card">
          <h4>Total de gastos </h4>
          <h5>R$ {despesa.toFixed(2)}</h5>
        </div>
        <div className="valores-card">
          <h4>Economia planejada</h4>
          <h5>{balanco.toFixed(1)}%</h5>
        </div>
      </div>
      <Container className="plan-card mb-3">
        <div className="element-card">
          <Element name="pag1" className="element">
            {pagina === "pag1" && (
              <div>
                <PlanejamentoPag1 onContinue={() => handlePagina("pag2")} />
                <Button onClick={excluirPlanejamento}>Excluir</Button>
              </div>
            )}
          </Element>
          <Element name="pag2" className="element">
            {pagina === "pag2" && (
              <div>
                <h2>Pagina 2</h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Sequi suscipit in fugit, incidunt perspiciatis nemo? Unde eius
                  voluptates maxime voluptatum aperiam corrupti atque, labore
                  veritatis illo eveniet pariatur totam consectetur earum
                  tempora accusantium ex. Reprehenderit molestiae non iusto
                  aliquid? Ducimus neque, odio magnam placeat, vero quibusdam
                  laborum alias magni voluptate ipsa unde quisquam earum error
                  vel dolorem itaque dignissimos sed, deleniti nulla velit. Sint
                  doloremque voluptatum aut doloribus quia temporibus, velit
                  suscipit, repudiandae dolores sunt quo nesciunt rerum
                  consequatur. Labore deserunt illo veritatis, nam consequuntur
                  nisi asperiores similique consequatur consectetur iste ipsam
                  repellendus delectus iusto ratione quod ea deleniti quae?
                </p>
                <Button onClick={() => handlePagina("pag3")}>Continuar</Button>
              </div>
            )}
          </Element>
          <Element name="pag3" className="element">
            {pagina === "pag3" && (
              <div>
                <h2>Pagina 3</h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Sequi suscipit in fugit, incidunt perspiciatis nemo? Unde eius
                  voluptates maxime voluptatum aperiam corrupti atque, labore
                  veritatis illo eveniet pariatur totam consectetur earum
                  tempora accusantium ex. Reprehenderit molestiae non iusto
                  aliquid? Ducimus neque, odio magnam placeat, vero quibusdam
                  laborum alias magni voluptate ipsa unde quisquam earum error
                  vel dolorem itaque dignissimos sed, deleniti nulla velit. Sint
                  doloremque voluptatum aut doloribus quia temporibus, velit
                  suscipit, repudiandae dolores sunt quo nesciunt rerum
                  consequatur. Labore deserunt illo veritatis, nam consequuntur
                  nisi asperiores similique consequatur consectetur iste ipsam
                  repellendus delectus iusto ratione quod ea deleniti quae?
                </p>
                <Button>Continuar</Button>
              </div>
            )}
          </Element>
        </div>
      </Container>
    </main>
  );
}

export default Planejamento;
