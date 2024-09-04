import { Button, Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../styles/Login.css";
import toast from "react-hot-toast";
import {
  cadastrarUsuario,
  entrarFacebook,
  entrarGithub,
  entrarGoogle,
  entrarTwitter,
  loginUsuario,
  redefinirSenha,
} from "../firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UsuarioContext } from "../contexts/UserContext";
import { useContext } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerCadastro,
    handleSubmit: handleSubmitCadastro,
    formState: { errors: errorsCadastro },
  } = useForm();

  const navigate = useNavigate();
  const usuario = useContext(UsuarioContext);

  function cadastrar(data) {
    cadastrarUsuario(data.nome, data.email, data.senha)
      .then(() => {
        navigate("/financas");
      })
      .catch((error) => {
        toast.error("Um erro aconteceu: " + error.code);
      });
  }

  function entrar(data) {
    loginUsuario(data.email, data.senha)
      .then(() => {
        toast.success("Bem-vindo(a)!");
        navigate("/financas");
      })
      .catch(() => {
        toast.error("Email e/ou senha incorreta!");
      });
  }

  function handleEntrarGoogle() {
    entrarGoogle().then(() => {
      toast.success("Bem-vindo(a)!");
      navigate("/financas");
    });
  }

  function handleEntrarFacebook() {
    entrarFacebook().then(() => {
      toast.success("Bem-vindo(a)!");
      navigate("/financas");
    });
  }

  function handleEntrarTwitter() {
    entrarTwitter().then(() => {
      toast.success("Bem-vindo(a)!");
      navigate("/financas");
    });
  }

  function handleEntrarGithub() {
    entrarGithub().then(() => {
      toast.success("Bem-vindo(a)!");
      navigate("/financas");
    });
  }

  function handleRedefinirSenha() {
    redefinirSenha();
  }

  if (usuario) {
    return <Navigate to={"/financas"} />;
  }

  return (
    <main className="loginpage">
      <section className="loginleft">
        <h2>Sua jornada financeira começa aqui.</h2>
        <img
          src={"/img/img-login.png"}
          width="250px"
          alt="imagem com cifrão segurando um saco de dinheiro"
        />
        <p>
          O controle das suas finanças está ao alcance das suas mãos. Com a
          SoulBudge, você tem o poder de planejar, monitorar e transformar sua
          vida financeira. Deixe-nos ser o seu guia nessa trajetória rumo ao
          sucesso.
        </p>
      </section>
      <section className="loginright">
        <Tabs className="tab-titles" fill>
          <Tab className="tabsform" title="Login" eventKey="login">
            <form className="form-section mt-5" onSubmit={handleSubmit(entrar)}>
              <div>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  className="form-control formlog"
                  {...register("email", {
                    required: "O email é obrigatório.",
                  })}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
              </div>
              <div>
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  id="senha"
                  className="form-control formlog"
                  {...register("senha", {
                    required: "A senha é obrigatória.",
                    minLength: {
                      value: 6,
                      message: "Mínimo de 6 caracteres.",
                    },
                  })}
                />
                {errors.senha && (
                  <small className="text-danger">{errors.senha.message}</small>
                )}
              </div>
              <Link
                onClick={handleRedefinirSenha}
                className="esqsenha"
                id="reset"
              >
                <small>Esqueceu a senha?</small>
              </Link>
              <h5 className="mt-4 rs-text">
                Quero acessar com minha rede social
              </h5>
              <div className="rs-icons mt-3">
                <Link onClick={handleEntrarGoogle}>
                  <img src={"/img/google.png"} alt="google" />
                </Link>
                <Link onClick={handleEntrarFacebook}>
                  <img src={"/img/facebook.png"} alt="facebook" />
                </Link>
                <Link onClick={handleEntrarTwitter}>
                  <img src={"/img/twitter.png"} alt="x(twitter)" />
                </Link>
                <Link onClick={handleEntrarGithub}>
                  <img src={"/img/github.png"} alt="github" />
                </Link>
              </div>
              <Button
                className="btnlogin mt-4 w-100"
                style={{ backgroundColor: "#FF4E00", border: "#FF4E00" }}
                type="submit"
              >
                Entrar
              </Button>
            </form>
          </Tab>
          <Tab className="tabsform" title="Cadastro" eventKey="cadastro">
            <form
              className="form-section mt-4"
              onSubmit={handleSubmitCadastro(cadastrar)}
            >
              <div>
                <label htmlFor="nome">Nome completo</label>
                <input
                  type="text"
                  id="nome"
                  className="form-control formlog"
                  {...registerCadastro("nome", {
                    required: true,
                    maxLength: 150,
                  })}
                />
                {errorsCadastro.nome && (
                  <small className="text-danger">O nome é inválido!</small>
                )}
              </div>
              <div>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  className="form-control formlog"
                  {...registerCadastro("email", {
                    required: "O email é obrigatório.",
                  })}
                />
                {errorsCadastro.email && (
                  <small className="text-danger">
                    {errorsCadastro.email.message}
                  </small>
                )}
              </div>
              <div>
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  id="senha"
                  className="form-control formlog"
                  {...registerCadastro("senha", {
                    required: "A senha é obrigatória.",
                    minLength: {
                      value: 6,
                      message: "Mínimo de 6 caracteres.",
                    },
                  })}
                />
                {errorsCadastro.senha && (
                  <small className="text-danger">
                    {errorsCadastro.senha.message}
                  </small>
                )}
              </div>
              <h5 className="mt-4 rs-text">
                Quero acessar com minha rede social
              </h5>
              <div className="rs-icons mt-3">
                <Link onClick={handleEntrarGoogle}>
                  <img src={"/img/google.png"} alt="google" />
                </Link>
                <Link onClick={handleEntrarFacebook}>
                  <img src={"/img/facebook.png"} alt="facebook" />
                </Link>
                <Link onClick={handleEntrarTwitter}>
                  <img src={"/img/twitter.png"} alt="x(twitter)" />
                </Link>
                <Link onClick={handleEntrarGithub}>
                  <img src={"/img/github.png"} alt="github" />
                </Link>
              </div>
              <Button
                className="btnlogin mt-4 w-100"
                style={{ backgroundColor: "#FF4E00", border: "#FF4E00" }}
                type="submit"
              >
                Cadastrar
              </Button>
            </form>
          </Tab>
        </Tabs>
      </section>
    </main>
  );
}

export default Login;
