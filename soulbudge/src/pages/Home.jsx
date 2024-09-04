import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaBell, FaMoneyBill, FaTools } from "react-icons/fa";
import logo from "../../public/img/logosb.png";
import "../styles/Home.css";

function Home() {
  return (
    <Container fluid className="home-container py-5">
      <Container>
        <Row className="mb-4 justify-content-center">
          <Col className="logo2 text-center">
            <img src={logo} alt="Logo" className="img-fluid" />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col className="home-titulo text-center">
            <hr className="home-hr" />
            <h2>
              O SoulBudge tem o objetivo de ajudá-lo a controlar suas finanças
              de maneira fácil e eficiente, auxiliando para um futuro financeiro
              seguro e contas sempre em dia.
            </h2>
            <hr className="home-hr" />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col md={12} lg={4}>
            <Card className="home-card shadow-sm d-flex flex-column h-100 mt-3">
              <Card.Body className="flex-grow-1">
                <Card.Title className="home-card-titulo text-center">
                  <FaMoneyBill size={30} className="mb-2 icone" /> Controle
                  Financeiro
                </Card.Title>
                <Card.Text className="home-card-texto">
                  Monitore suas receitas e despesas para uma economia mais
                  eficiente e despesas sempre em dia.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} lg={4}>
            <Card className="home-card shadow-sm d-flex flex-column h-100 mt-3">
              <Card.Body className="flex-grow-1">
                <Card.Title className="home-card-titulo text-center">
                  <FaTools size={30} className="mb-2 icone" /> Ferramentas
                  Inovadoras
                </Card.Title>
                <Card.Text className="home-card-texto">
                  Utilize as melhores ferramentas para acompanhar suas finanças
                  em tempo real.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} lg={4}>
            <Card className="home-card shadow-sm d-flex flex-column h-100 mt-3">
              <Card.Body className="flex-grow-1">
                <Card.Title className="home-card-titulo text-center">
                  <FaBell size={30} className="mb-2 icone" /> Seja avisado em
                  tempo real
                </Card.Title>
                <Card.Text className="home-card-texto">
                  Seja lembrado em tempo real todas as vezes que suas contas
                  estão perto de vencer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <Button className="home-btn" href="/login">
              Explore nossa plataforma
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home;
