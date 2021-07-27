/* eslint-disable @next/next/no-img-element */
import {
  useEffect,
  useState,
} from "react";

import validator from "email-validator";
import router from "next/router";

import { TextField } from "@material-ui/core";

import HeaderComponent from "../../components/HeaderComponent";
import { decrypt } from "../../services/decrypt";
import { encrypt } from "../../services/encrypt";
import {
  Body,
  Button,
  Main,
  TextMain,
} from "../../styles/styles";

export default function Cadastrar() {
  const [useName, setName] = useState();
  const [useLastName, setLastName] = useState();
  const [useCpf, setCpf] = useState();
  const [useLevel, setLevel] = useState();
  const [useError, setError] = useState("");
  const [isSend, setSend] = useState(false);
  // pegar cpf do usuário
  useEffect(() => {
    const decryptCpf = async () => {
      setCpf(await decrypt(sessionStorage.getItem("documento"), false));
      sessionStorage.removeItem("documento");
    };
    decryptCpf();
    setLevel(1);
  }, []);
  // rules
  const handleChangeLevel = async (e) => {
    const nome = document?.getElementById("nome")?.value;
    const sobrenome = document?.getElementById("sobrenome")?.value;
    const email = document?.getElementById("email")?.value;
    const senha = document?.getElementById("senha")?.value;
    const confirmarSenha = document?.getElementById("confirmar_senha")?.value;
    if (useLevel > 1 && !validator.validate(email) && email?.length > 5) {
      setLevel(2);
      return setError("digite um e-mail válido");
    }
    if (
      confirmarSenha?.length > 2 &&
      senha?.length > 2 &&
      senha !== confirmarSenha
    ) {
      setLevel(3);
      return setError("digite a mesma senha nos dois campos");
    }
    if (confirmarSenha?.length > 2 && senha?.length > 2 && useLevel === 3) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      await fetch(`/api/usuario/get-email/${email}`, {
        method: "GET",
        headers: headers,
      }).then((response) => {
        response.json().then(async (data) => {
          if (response.status === 200) {
            setError("o e-mail já foi utilizado");
            return setLevel(2);
          }
        });
      });
    }
    if (
      confirmarSenha?.length > 2 &&
      senha?.length > 2 &&
      senha === confirmarSenha
    ) {
      setError("");
      setLevel(4);
    } else if (email?.length > 5 && validator.validate(email)) {
      setError("");
      setLevel(3);
    } else if (nome?.length > 0 && sobrenome?.length) {
      setError("");
      setLevel(2);
    } else {
      setError("");
      setLevel(1);
    }
  };
  // request body
  const handleClickRequestBody = async (e) => {
    e.preventDefault();
    const nome = document?.getElementById("nome")?.value;
    const sobrenome = document?.getElementById("sobrenome")?.value;
    const email = document?.getElementById("email")?.value;
    const senha = document?.getElementById("senha")?.value;
    const body = {
      cpf: useCpf,
      email: email,
      nome: nome,
      senha: await encrypt(senha, false),
      sobrenome: sobrenome,
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    setSend(true);
    fetch("/api/usuario/post", {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    }).then((response) => {
      response.json().then(async (data) => {
        setSend(false);
        if (response.status !== 201) {
          alert(
            "Houve um erro e não foi possível salvar seu cadastro, tente novamente mais tarde."
          );
          return router.push("/");
        }
        sessionStorage.setItem("dados", data.data);
        sessionStorage.setItem("perfil", "usuario");
        return router.push("/usuario/dashboard");
      });
    });
  };
  return (
    <Body>
      <HeaderComponent />
      <Main maxWidth="600px" style={{ width: "100%", marginBottom: "5rem" }}>
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <TextMain>
            olá
            {useName
              ? `, ${useName}${useLastName ? ` ${useLastName}` : ""}`
              : ", comece digitando seu nome"}
            {useName ? (
              <>
                {useCpf ? (
                  <>
                    <br />
                    <span>
                      utilizaremos esse cpf:{" "}
                      {useCpf.replace(
                        /(\d{3})(\d{3})(\d{3})(\d{2})/,
                        "$1.$2.$3-$4"
                      )}
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </TextMain>
          {useLevel > 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexFlow: "row wrap",
                  width: "100%",
                  gap: "1rem",
                }}
              >
                <TextField
                  style={{ flex: 1 }}
                  type="text"
                  label="Seu nome ou nome social"
                  id="nome"
                  placeholder="Digite como deseja ser chamado"
                  variant="filled"
                  onChange={(e) => {
                    setName(e.target.value);
                    handleChangeLevel(e);
                  }}
                />
                <TextField
                  style={{ flex: 1 }}
                  type="text"
                  label="Seu sobrenome"
                  id="sobrenome"
                  placeholder="Digite seu sobrenome"
                  variant="filled"
                  onChange={(e) => {
                    setLastName(e.target.value);
                    handleChangeLevel(e);
                  }}
                />
              </div>
              {useLevel > 1 ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column nowrap",
                      width: "100%",
                      gap: "1rem",
                    }}
                  >
                    <TextField
                      style={{ flex: 1 }}
                      type="text"
                      label="Seu e-mail"
                      id="email"
                      placeholder="Digite seu e-mail"
                      variant="filled"
                      onChange={(e) => handleChangeLevel(e)}
                    />
                    {useError === "digite um e-mail válido" ? (
                      <p style={{ margin: "0 0", color: "red" }}>
                        digite um e-mail válido
                      </p>
                    ) : (
                      <></>
                    )}
                    {useError === "o e-mail já foi utilizado" ? (
                      <p style={{ margin: "0 0", color: "red" }}>
                        o e-mail já foi utilizado
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  {useLevel > 2 ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexFlow: "column wrap",
                          width: "100%",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexFlow: "row wrap",
                            width: "100%",
                            gap: "1rem",
                          }}
                        >
                          <TextField
                            style={{ flex: 1 }}
                            type="password"
                            label="Sua senha"
                            id="senha"
                            placeholder="Digite uma senha"
                            variant="filled"
                            onChange={(e) => {
                              handleChangeLevel(e);
                            }}
                          />
                          <TextField
                            style={{ flex: 1 }}
                            type="password"
                            label="Confirme a senha"
                            id="confirmar_senha"
                            placeholder="Digite sua senha"
                            variant="filled"
                            onChange={(e) => handleChangeLevel(e)}
                          />
                        </div>
                        {useError === "digite a mesma senha nos dois campos" ? (
                          <p style={{ margin: "0 0", color: "red" }}>
                            digite a mesma senha nos dois campos
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                      {useLevel > 3 ? (
                        <>
                          {isSend ? (
                            <>
                              <img
                                src="/loading.gif"
                                alt="Carregando..."
                                id="loading"
                              />
                            </>
                          ) : (
                            <Button
                              onClick={(e) => handleClickRequestBody(e)}
                              bgColor="primary"
                              color="third"
                            >
                              cadastrar
                            </Button>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </Main>
    </Body>
  );
}
