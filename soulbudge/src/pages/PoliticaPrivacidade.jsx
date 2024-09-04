import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/PoliticaPrivacidade.css";

function PoliticaPrivacidade() {
  return (
    <Container fluid className="privacidade-container py-5">
      <Container>
        <Row className="mb-4 justify-content-center">
          <Col className="text-center">
            <h1 className="privacidade-titulo">Política de Privacidade</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="privacidade-card shadow-lg">
              <Card.Body>
                <Card.Text>
                  <h2>1. Introdução</h2>
                  <p>
                    A SoulBudge Ltda. (&ldquo;SoulBudge&rdquo;,
                    &ldquo;nós&rdquo; ou &ldquo;nosso&rdquo;) está comprometida
                    em proteger a privacidade de seus usuários. Esta Política de
                    Privacidade descreve como coletamos, usamos, compartilhamos
                    e protegemos as informações pessoais que você nos fornece
                    quando acessa e utiliza nossos serviços (o
                    &ldquo;Serviço&rdquo;). Ao utilizar o Serviço, você concorda
                    com os termos desta Política de Privacidade.
                  </p>
                  <h2>2. Informações que Coletamos</h2>
                  <p>Podemos coletar as seguintes informações pessoais:</p>
                  <ul>
                    <li>Informações de contato: Nome e endereço de e-mail.</li>
                    <li>
                      Informações financeiras: Dados financeiros, histórico de
                      transações, saldos.
                    </li>
                    <li>
                      Dados de uso: Informações sobre como você utiliza o
                      Serviço, incluindo as páginas visitadas, as
                      funcionalidades utilizadas e as ações realizadas.
                    </li>
                    <li>
                      Informações do dispositivo: Tipo de dispositivo, sistema
                      operacional, endereço IP.
                    </li>
                  </ul>
                  <h2>3. Como Usamos suas Informações</h2>
                  <p>Utilizamos suas informações pessoais para:</p>
                  <ul>
                    <li>
                      Fornecer e melhorar o Serviço: Personalizar sua
                      experiência, oferecer suporte técnico e desenvolver novos
                      recursos.
                    </li>
                    <li>
                      Processar pagamentos: Facilitar transações financeiras e
                      emitir recibos.
                    </li>
                    <li>
                      Enviar comunicações: Informar sobre atualizações do
                      Serviço, novidades e responder a suas perguntas.
                    </li>
                    <li>
                      Detectar e prevenir fraudes: Proteger sua conta e o
                      Serviço contra atividades ilegais.
                    </li>
                    <li>
                      Analisar dados: Compreender o comportamento dos usuários e
                      melhorar o Serviço.
                    </li>
                  </ul>
                  <h2>4. Compartilhamento de suas Informações</h2>
                  <p>Podemos compartilhar suas informações pessoais com:</p>
                  <ul>
                    <li>
                      Prestadores de serviços: Empresas que nos auxiliam na
                      prestação de serviços, como hospedagem de sites,
                      processamento de pagamentos e análise de dados.
                    </li>
                    <li>
                      Parceiros de negócios: Em casos específicos, para oferecer
                      produtos ou serviços complementares.
                    </li>
                    <li>
                      Autoridades competentes: Quando exigido por lei ou para
                      proteger nossos direitos ou os de terceiros.
                    </li>
                  </ul>
                  <h2>5. Segurança de seus Dados</h2>
                  <p>
                    Implementamos medidas de segurança técnicas e
                    administrativas para proteger suas informações pessoais
                    contra acesso não autorizado, divulgação, alteração ou
                    destruição. No entanto, nenhum método de transmissão de
                    dados pela internet ou armazenamento de dados é
                    completamente seguro.
                  </p>
                  <h2>6. Seus Direitos</h2>
                  <p>Você tem o direito de:</p>
                  <ul>
                    <li>Acessar suas informações pessoais.</li>
                    <li>Corrigir informações incorretas.</li>
                    <li>Excluir suas informações pessoais.</li>
                    <li>
                      Opor-se ao processamento de suas informações pessoais.
                    </li>
                    <li>Solicitar a portabilidade de seus dados.</li>
                  </ul>
                  <p>
                    Para exercer seus direitos, entre em contato conosco através
                    dos canais indicados abaixo.
                  </p>
                  <h2>7. Cookies e Tecnologias Similares</h2>
                  <p>
                    Utilizamos cookies e tecnologias semelhantes para coletar
                    informações sobre sua navegação. Você pode configurar seu
                    navegador para bloquear cookies, mas isso pode afetar a
                    funcionalidade do Serviço.
                  </p>
                  <h2>8. Alterações nesta Política</h2>
                  <p>
                    Podemos atualizar esta Política de Privacidade
                    periodicamente. As alterações entrarão em vigor a partir da
                    data de publicação da versão atualizada.
                  </p>
                  <h2>9. Contato</h2>
                  <p>
                    Para entrar em contato conosco sobre esta Política de
                    Privacidade, envie um e-mail para contato@soulbudge.com.br.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default PoliticaPrivacidade;
