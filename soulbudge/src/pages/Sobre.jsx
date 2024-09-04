import "../styles/Sobre.css";

function Sobrenos() {
  return (
    <main>
      <h1 className="sobre-titulo">
        A SOULBOUDGE É PARTE DA FAMÍLIA FINANCE TECH
      </h1>
      <section className="sobre-bloco1">
        <p>
          Em 2024, a SoulBudge se une à Finance Tech, fortalecendo nossa missão
          com uma empresa brasileira de tecnologia financeira dedicada a
          proporcionar ainda mais autonomia financeira para as pessoas.
        </p>

        <img
          src="/img/moeda.png"
          alt="Imagem de uma moeda"
          className="sobre-logo-moeda"
        />

        <p>
          Nosso objetivo é construir uma comunidade global de indivíduos com as
          finanças sob controle, e essa parceria é um passo essencial para
          alcançarmos essa visão, juntos, como um grupo: SoulBudge + Finance
          Tech.
        </p>
      </section>

      <h4 className="sobre-subtitulo">CONHEÇA A FINANCE TECH</h4>

      <section className="sobre-bloco2">
        <div className="sobre-cards-esquerdo">
          <p className="sobre-card">
            Na SoulBudge, acreditamos que cada pessoa tem o potencial de
            alcançar a liberdade financeira. Nossa missão é fornecer as
            ferramentas, conhecimentos e suporte necessários para que você possa
            gerenciar suas finanças com confiança e eficiência.
          </p>
          <p className="sobre-card">
            Estamos comprometidos em ser mais do que uma plataforma — somos seu
            parceiro na jornada rumo ao sucesso financeiro. Nossa equipe de
            especialistas está sempre disponível para ajudar você a tomar
            decisões financeiras informadas e transformar suas aspirações em
            realidade. Junte-se a nós e descubra como a SoulBudge pode energizar
            suas finanças e transformar sua vida.
          </p>
        </div>

        <img
          src="/img/cifrao.png"
          alt="imagem de cifrão"
          className="sobre-logo-cifrao"
        />

        <div className="sobre-cards-direito">
          <p className="sobre-card2">
            Fundada com o objetivo de simplificar o controle financeiro, a
            SoulBudge combina tecnologia de ponta com uma interface intuitiva,
            permitindo que você acompanhe suas despesas, planeje orçamentos e
            alcance suas metas financeiras sem complicações.
          </p>
          <p className="sobre-card2">
            Uma das maiores fintechs do mundo, a Finance Tech combina expertise
            humana e tecnologia de ponta para que você possa gerenciar suas
            finanças e investimentos de forma simples, segura e lucrativa.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Sobrenos;
