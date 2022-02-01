import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Tooltip } from "bootstrap";

import Parse from "parse/dist/parse.min.js";

import Button from "../../components/atoms/Button";
import Detail from "../../media/images/ret1.svg";
import DetailSecondary from "../../media/images/ret2.svg";

import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [updatingContent, setUpdatingContent] = useState(false);
  const [emailInputMessage, setEmailInputMessage] =
    useState("Insira seu e-mail");
  const [passwordInputMessage, setPasswordlInputMessage] =
    useState("Insira sua senha");
  const [successMessage, setSuccsessMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [validation, setValidation] = useState({
    validEmail: false,
    validPassword: false,
  });

  function checkValidation(eventTarget, field) {
    setValidation({ ...validation, [field]: eventTarget.checkValidity() });
  }

  useEffect(() => {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });

    if (searchParams.get("status") !== undefined) {
      switch (searchParams.get("status")) {
        case "register-successful":
          setSuccsessMessage(
            "Usuário registrado com sucesso! Realize o login."
          );
          break;
        case "invalid-session":
          setWarningMessage("Sessão inválida. Realize o login novamente.");
          break;
        case "logout-successful":
          setWarningMessage("Logout realizado com sucesso.");
          break;
        default:
          break;
      }
    }
  }, []);

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    setCurrentUser(currentUser);
    return currentUser;
  };

  async function authenticate() {
    if (validation.validEmail === true && validation.validPassword === true) {
      setUpdatingContent(true);

      try {
        const loggedInUser = await Parse.User.logIn(emailValue, passwordValue);

        setSuccsessMessage(
          "Usuário autenticado com sucesso! Redirecionando..."
        );
        await Parse.User.current();

        setPassword("");

        getCurrentUser();

        setInterval(() => {
          navigate("/inicio");
        }, 2000);
      } catch (error) {
        console.log(error);
        switch (error.code) {
          case 101:
            setWarningMessage("E-mail e/ou senha inválido(s)");
            break;
          case 200:
            setWarningMessage("É necessário especificar um e-mail válido");
            break;
          case 201:
            setWarningMessage("É necessário especificar uma senha válida");
            break;
          case 205:
            setWarningMessage("É necessário especificar um e-mail válido");
            break;
          default:
            break;
        }

        setPassword("");
        setUpdatingContent(false);
      }
    }
  }

  return (
    <div id="login-scene" className="container-flex p-0">
      <div className="row g-0">
        <div className="order-1 order-lg-0 col-12 col-lg d-grid align-content-center">
          <div className="d-none d-lg-block login-detail-top">
            <img className="dt-1" src={Detail} alt="Figura detalhe" />
            <img className="dt-2" src={DetailSecondary} alt="Figura detalhe" />
          </div>
          <div className="container login-container h-100">
            <div>
              <h2 className="app-logo text-center mb-5">social.io</h2>
            </div>
            <div>
              {warningMessage !== "" || successMessage !== "" ? (
                <div
                  class={`alert alert-${
                    warningMessage !== "" ? "warning" : "success"
                  } alert-dismissible fade show`}
                  role="alert"
                >
                  {warningMessage !== "" ? warningMessage : successMessage}
                  <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    onClick={() => {
                      setWarningMessage("");
                      setSuccsessMessage("");
                    }}
                  ></button>
                </div>
              ) : (
                <h4 className="text-secondary text-center  mb-5">
                  conectando 215613 pessoas atualmente
                </h4>
              )}
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
                    value={emailValue}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      checkValidation(e.target, "validEmail");
                    }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={emailInputMessage}
                    disabled={updatingContent}
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="password"
                    className="form-control app-input"
                    id="password-input"
                    name="password-input"
                    value={passwordValue}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      checkValidation(e.target, "validPassword");
                    }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={passwordInputMessage}
                    aria-describedby="password-input-help"
                    placeholder="Senha"
                    minLength="6"
                    disabled={updatingContent}
                    required
                  />

                  <div
                    id="password-input-help"
                    className="form-text pt-1 text-end"
                  >
                    <Link to={""}>Recuperar acesso</Link>
                  </div>
                </div>
                <Button
                  type="button"
                  buttonstyle="primary text-center mb-4"
                  disabled={updatingContent === true ? true : false}
                  onClick={(e) => {
                    e.preventDefault();
                    e.target.parentElement.parentElement.reportValidity();
                    authenticate();
                  }}
                >
                  {updatingContent === false ? (
                    "Entrar"
                  ) : (
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                </Button>
              </form>
              <div className="text-center">
                <p className="text-secondary mb-0">
                  Não possui uma conta? <br />
                  <Link to={"/register"} className="text-dark">
                    {" "}
                    Registre-se
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block login-detail-bottom">
            <img className="dt-1" src={Detail} alt="Figura detalhe" />
            <img className="dt-2" src={DetailSecondary} alt="Figura detalhe" />
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
