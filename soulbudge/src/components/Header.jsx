import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { useContext, useState, useEffect } from "react";
import { UsuarioContext } from "../contexts/UserContext";
import { logout } from "../firebase/auth";

function Header() {
  const usuario = useContext(UsuarioContext);
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState("/img/fotoperfil.png");

  useEffect(() => {
    if (usuario) {
      const savedProfilePic = localStorage.getItem(`profilePic_${usuario.uid}`);
      if (savedProfilePic) {
        setProfilePic(savedProfilePic);
      } else {
        setProfilePic("/img/fotoperfil.png");
      }
    }
  }, [usuario]);

  function handleLogout() {
    logout().then(() => {
      navigate("/login");
    });
  }

  function handleProfilePicChange(event) {
    const file = event.target.files[0];
    if (file && usuario) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const profilePicURL = reader.result;
        setProfilePic(profilePicURL);
        localStorage.setItem(`profilePic_${usuario.uid}`, profilePicURL);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <header>
      <Navbar expand="lg" bg="black" variant="dark" className="nav-bar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="logo">
            <img src="/img/logo.png" alt="Logo" width={240} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/sobre" className="nav-link">
                Sobre Nós
              </Nav.Link>
              <Nav.Link as={Link} to="/contato" className="nav-link">
                Contatos
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto nav-icons">
              {!usuario && (
                <Nav.Link as={Link} to="/login" className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-in-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                  Iniciar Sessão
                </Nav.Link>
              )}
              {usuario && (
                <>
                  <img
                    src={profilePic}
                    alt="Foto de Perfil"
                    width={40}
                    height={40}
                    className="rounded-circle me-2"
                  />
                </>
              )}
              {usuario && (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                    className="nav-link"
                  >
                    Menu de {usuario.displayName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as="label" htmlFor="upload-photo">
                      Alterar Foto de Perfil
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        className="d-none"
                        id="upload-photo"
                      />
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/financas">
                      Meu Controle Financeiro
                    </Dropdown.Item>
                    <Nav.Link variant="light" onClick={handleLogout}>
                      Desconectar
                    </Nav.Link>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
