import { useState } from "react";

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

export default function Login() {
  const [isCadastro, setCadastro] = useState(false);
  const [useSenha, setSenha] = useState();
  const [useError, setError] = useState("");
  const handleCpfJustNumber = async (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");
    if (e.target.value.length === 11) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      fetch(`/api/usuario/get-document/${e.target.value}`, {
        method: "GET",
        headers: headers,
      }).then((response) => {
        response.json().then(async (data) => {
          if (response.status !== 200) {
            sessionStorage.setItem(
              "documento",
              await encrypt(e.target.value, false)
            );
            return router.push("/usuario/cadastrar");
          }
          sessionStorage.setItem("dados", data.data);
          const decryptedData = await decrypt(
            sessionStorage.getItem("dados"),
            true
          );
          setSenha(await decrypt(decryptedData.senha, false));
          setCadastro(true);
        });
      });
    }
  };
  const handleClickLogin = async (e) => {
    e.preventDefault();
    const senhaDigitada = document?.getElementById("senha")?.value;
    if (senhaDigitada === useSenha) {
      sessionStorage.setItem("perfil", "usuario");
      return router.push("/usuario/dashboard");
    } else {
      return setError("a senha está incorreta");
    }
  };
  return (
    <Body>
      <HeaderComponent />
      <Main maxWidth="400px" style={{ width: "100%", marginBottom: "5rem" }}>
        <TextMain>Primeiramente digite seu CPF</TextMain>
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {useError === "a senha está incorreta" ? (
            <p style={{ margin: "0 0", color: "red" }}>
              a senha está incorreta
            </p>
          ) : (
            <></>
          )}
          <TextField
            fullWidth
            type="text"
            label="CPF"
            id="cpf"
            placeholder="Digite seu CPF"
            variant="filled"
            inputProps={{ maxLength: 11 }}
            onChange={(e) => handleCpfJustNumber(e)}
          />
          {isCadastro ? (
            <>
              <TextField
                fullWidth
                type="password"
                label="Sua senha"
                id="senha"
                placeholder="Digite uma senha"
                variant="filled"
              />
              <Button
                style={{ maxWidth: "fit-content" }}
                bgColor="primary"
                color="third"
                onClick={(e) => handleClickLogin(e)}
              >
                fazer login
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
      </Main>
    </Body>
  );
}
