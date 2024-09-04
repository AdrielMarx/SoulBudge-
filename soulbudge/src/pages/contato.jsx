import { useState } from "react";
import "../styles/Contato.css";

const Contato = () => {
  const [formData, setFormData] = useState({
    escolha: "",
    nome: "",
    email: "",
    mensagem: "",
  });

  const identificador = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const prevencao = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/mblravbe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Mensagem enviada com sucesso!");
        setFormData({
          escolha: "",
          nome: "",
          email: "",
          mensagem: "",
        });
      } else {
        const errorText = await response.text();
        alert(`Erro ao enviar mensagem: ${errorText}`);
      }
    } catch (error) {
      alert(`Erro ao enviar mensagem: ${error.message}`);
    }
  };

  return (
    <div className="fale-conosco-container">
      <h1 className="titulo">Fale Conosco</h1>
      <form onSubmit={prevencao} className="fale-conosco-form">
        <div className="form-radio">
          <div className="coluna coluna-label">
            <label htmlFor="escolha" className="label-titulo">
              Escolha:
            </label>
          </div>

          <div className="coluna">
            <div className="radio-grupo">
              <label className="radio-label">
                <input
                  type="radio"
                  id="elogio"
                  name="escolha"
                  value="Elogio"
                  onChange={identificador}
                />
                Elogio
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  id="sugestao"
                  name="escolha"
                  value="Sugestão"
                  onChange={identificador}
                />
                Sugestão
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  id="duvida"
                  name="escolha"
                  value="Dúvida"
                  onChange={identificador}
                />
                Dúvida
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  id="critica"
                  name="escolha"
                  value="Crítica"
                  onChange={identificador}
                />
                Crítica
              </label>
            </div>
          </div>

          <div className="coluna">
            <div className="input-grupo">
              <label htmlFor="nome" className="label-titulo">
                Nome Completo
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="input-text"
                value={formData.nome}
                onChange={identificador}
                required
              />
            </div>
            <div className="input-grupo">
              <label htmlFor="email" className="label-titulo">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-email"
                value={formData.email}
                onChange={identificador}
                required
              />
            </div>
          </div>
        </div>

        <div className="input-grupo mensagem-container">
          <label htmlFor="mensagem" className="label-titulo">
            Deixe sua mensagem
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            className="input-textarea"
            value={formData.mensagem}
            onChange={identificador}
            required
          ></textarea>
        </div>

        <div className="form-actions">
          <div className="whatsapp_enviar">
            <button type="submit" className="button_enviar">
              Enviar
            </button>
            <a
              href="https://wa.me/1234567890?text=Olá!%20Gostaria%20de%20mais%20informações."
              className="whatsapp-icon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/img/whatsapp_contato.png" alt="WhatsApp" />
              <div className="whatsapp_cxTxt">
                <p>Dúvidas, Sugestões ou Ajuda.</p>
                <p>📲 Fale com a gente! 👉🏼</p>
              </div>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contato;
