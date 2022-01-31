import Button from "../../components/atoms/Button";
import { Link } from "react-router-dom";

import Detail from "../../media/images/ret1.svg";
import DetailSecondary from "../../media/images/ret2.svg";

import "./login.css";

export default function Login() {
  return (
    <div id="login-scene" className="container-flex p-0">
      <div className="row g-0">
        <div className="order-1 order-lg-0 col-12 col-lg d-grid align-content-center">
          <div className="d-none d-lg-block login-detail-top">
            <img className="dt-1" src={Detail} alt="Figura detalhe" />
            <img
              className="dt-2"
              src={DetailSecondary}
              alt="Figura detalhe"
              srcset=""
            />
          </div>
          <div className="container login-container h-100">
            <div>
              <h2 className="app-logo text-center mb-5">social.io</h2>
            </div>
            <div>
              <h4 className="text-secondary text-center  mb-5">
                conectando 215613 pessoas atualmente
              </h4>
            </div>
            <div>
              <form>
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control app-input"
                    id="email-input"
                    name="email-input"
                    placeholder="E-mail"
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="password"
                    className="form-control app-input"
                    id="password-input"
                    name="password-input"
                    aria-describedby="password-input-help"
                    placeholder="Senha"
                    required
                  />

                  <div
                    id="password-input-help"
                    className="form-text pt-1 text-end"
                  >
                    <Link to={""}>Recuperar acesso</Link>
                  </div>
                </div>
              </form>
              <Button buttonStyle="primary text-center mb-4">Entrar</Button>
              <div className="text-center">
                <p className="text-secondary mb-0">
                  Não possui uma conta? <br />
                  <Link to={""} className="text-dark">
                    {" "}
                    Registre-se
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block login-detail-bottom">
            <img className="dt-1" src={Detail} alt="Figura detalhe" />
            <img
              className="dt-2"
              src={DetailSecondary}
              alt="Figura detalhe"
              srcset=""
            />
          </div>
        </div>
        <div className="order-0 order-lg-1 col-12 col-lg">
          <div className="container-fluid p-0 login-splash-container">
            <div className="splash-overlay d-flex flex-column justify-content-between">
              <div className="d-inline d-lg-none">
                <h2 className="app-logo text-left text-light">social.io</h2>
              </div>
              <div className="splash-description">
                <h2 className="text-light">
                  O mundo em conexões
                  <br />
                  <small>e as conexões que movem o mundo</small>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
