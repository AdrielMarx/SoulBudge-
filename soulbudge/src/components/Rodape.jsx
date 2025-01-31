import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import "../styles/Rodape.css";

function Rodape() {
  return (
    <footer className="rodape" style={{ backgroundColor: "#000000" }}>
      <Container>
        <Row className="text-center text-md-left">
          <Col md={4} className="mb-4">
            <h5 className="mb-3 text-white">Links Úteis</h5>
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/PoliticaPrivacidade"
                className="text-decoration-underline"
                style={{ color: "#ffffff" }}
              >
                Política de Privacidade
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contato"
                className="text-decoration-underline"
                style={{ color: "#ffffff" }}
              >
                Fale Conosco
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={4} className="mb-4 text-center">
            <h5 className="mb-3 text-white">Redes Sociais</h5>
            <Nav className="d-flex justify-content-center">
              <Nav.Link
                href="https://facebook.com"
                className="text-decoration-none"
                style={{ color: "#ffffff", fontSize: "24px" }}
                aria-label="Facebook"
              >
                <FaFacebookF />
              </Nav.Link>
              <Nav.Link
                href="https://github.com"
                className="text-decoration-none"
                style={{ color: "#ffffff", fontSize: "24px" }}
                aria-label="GitHub"
              >
                <FaGithub />
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={4} className="mb-4 text-md-right text-center">
            <p className="mb-0 mt-3 text-white">
              &copy; {new Date().getFullYear()} SoulBudge. Todos os direitos
              reservados.
            </p>
            <Nav.Link
              as="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-white"
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                display: "inline-block",
                marginTop: "10px",
              }}
            >
              Voltar ao Topo
            </Nav.Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Rodape;
