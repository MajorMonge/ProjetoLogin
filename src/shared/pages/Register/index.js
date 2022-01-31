import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";

import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "bootstrap";

import Button from "../../components/atoms/Button";

import "./register.css";

export default function Register() {
  const navigate = useNavigate();

  const [updatingContent, setUpdatingContent] = useState(false);
  const [nameInputMessage, setNameInputMessage] = useState("Insira seu nome");
  const [emailInputMessage, setEmailInputMessage] =
    useState("Insira seu e-mail");
  const [passwordInputMessage, setPasswordlInputMessage] =
    useState("Insira sua senha");
  const [confirmPasswordInputMessage, setConfirmPasswordlInputMessage] =
    useState("Confirme sua senha");
  const [warningMessage, setWarningMessage] = useState("");
  const [nameValue, setName] = useState("");
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const [confirmPasswordValue, setConfirmPassword] = useState("");
  const [validation, setValidation] = useState({
    validName: false,
    validEmail: false,
    validPassword: false,
    validConfirmPassword: false,
  });

  function checkValidation(eventTarget, field) {
    setValidation({ ...validation, [field]: eventTarget.checkValidity() });
  }

  useEffect(() => {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });
  }, []);

  async function registerUser() {
    if (
      validation.validPassword === true &&
      validation.validConfirmPassword == true &&
      passwordValue === confirmPasswordValue
    ) {
      setUpdatingContent(true);
      try {
        const createdUser = await Parse.User.signUp(emailValue, passwordValue, {
          email: emailValue,
          name: nameValue,
        });

        console.log(
          `Success! User ${createdUser.getUsername()} was successfully created!`
        );
        
        navigate("/login?status=register-successful");
      } catch (error) {
        switch (error.code) {
          case 200:
            setWarningMessage("É necessário especificar um e-mail válido");
            break;
          case 201:
            setWarningMessage("É necessário especificar uma senha válida");
            break;
          case 202:
            setWarningMessage(
              "Já existe um usuário cadastrado com o e-mail informado"
            );
            break;
          case 203:
            setWarningMessage(
              "Já existe um usuário cadastrado com o e-mail informado"
            );
            break;
          case 204:
            setWarningMessage("É necessário especificar um e-mail válido");
            break;
          default:
            break;
        }
        setUpdatingContent(false);
      }
    } else if (validation.validEmail === true) {
      setWarningMessage("As senhas devem ser iguais");
    }
  }

  return (
    <div id="register-scene" className="container-flex p-0">
      <div className="row g-0">
        <div className="order-1 order-lg-1 col-12 col-lg h-100">
          <div className="container register-container  d-grid align-content-center">
            <div>
              <h2 className="app-logo text-center mb-5">social.io</h2>
            </div>
            <div>
              <h4 className="text-secondary text-center  mb-5">registre-se</h4>
              {warningMessage !== "" ? (
                <div
                  class="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  {warningMessage}
                  <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    onClick={() => {
                      setWarningMessage("");
                    }}
                  ></button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control app-input"
                    id="name-input"
                    name="name-input"
                    placeholder="Nome"
                    value={nameValue}
                    onChange={(e) => {
                      setName(e.target.value);
                      checkValidation(e.target, "validName");
                    }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={nameInputMessage}
                    disabled={updatingContent}
                    minLength="3"
                    required
                  />
                </div>
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
                <div className="mb-1">
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
                    Mínimo de 6 caracteres
                  </div>
                </div>
                <div className="mb-5">
                  <input
                    type="password"
                    className="form-control app-input"
                    id="confirm-password-input"
                    name="confirm-password-input"
                    value={confirmPasswordValue}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      checkValidation(e.target, "validConfirmPassword");
                    }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={confirmPasswordInputMessage}
                    placeholder="Confirmar senha"
                    minLength="6"
                    disabled={updatingContent}
                    required
                  />
                </div>
                <Button
                  type="button"
                  buttonstyle="secondary text-center mb-4"
                  disabled={updatingContent === true ? true : false}
                  onClick={(e) => {
                    e.preventDefault();
                    e.target.parentElement.parentElement.reportValidity();
                    registerUser();
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
                  Já possui uma conta? <br />
                  <Link to={"/login"} className="text-dark">
                    {" "}
                    Acesse agora mesmo
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-0 order-lg-0 col-12 col-lg">
          <div className="container-fluid p-0 register-splash-container">
            <div className="splash-overlay d-flex flex-column justify-content-between">
              <div className="d-inline d-lg-none">
                <h2 className="app-logo text-left text-light">social.io</h2>
              </div>
              <div className="splash-description mt-auto">
                <h2 className="text-light text-end">
                  Integrações contundentes
                  <br />
                  <small>para focar no que mais importa para você</small>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
