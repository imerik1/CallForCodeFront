import { useState } from "react";

import CryptoJS from "crypto-js";
import { useRouter } from "next/router";

import {
  Checkbox,
  TextField,
} from "@material-ui/core";

import { Header } from "../../components/Header";

export default function Organizacao() {
  const [isLoading, setLoading] = useState(false);
  const [isCadastrado, setCadastrado] = useState(false);
  const [isOng, setOng] = useState(true);
  const [useUser, setUser] = useState([]);
  const [useErro, setErro] = useState();
  const router = useRouter();
  const handleCnpjInput = async (e) => {
    var value = e.target.value.replace(/\D/g, "");
    if ((isOng && value.length === 11) || (!isOng && value.length === 14)) {
      setLoading(true);
      const res = await fetch(
        `https://ecoshared-api.herokuapp.com/collectors/document/${value}`
      );
      const data = await res.json();
      setLoading(false);
      if (!data.status) {
        const senha = CryptoJS.AES.decrypt(
          data.senha,
          process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
        ).toString(CryptoJS.enc.Utf8);
        data.senha = senha;
        await useUser.push(data);
        await setCadastrado(true);
      } else {
        const cpfCnpj = CryptoJS.AES.encrypt(
          value,
          process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
        ).toString();
        localStorage.setItem("documento", cpfCnpj);
        router.push("organizacao/cadastrar-organizacao");
      }
    }
  };
  const handleClickLogin = async (e) => {
    e.preventDefault();
    const senha = document?.getElementById("senha")?.value;
    if (useUser[0].senha === senha) {
      sessionStorage.setItem(
        "documento",
        CryptoJS.AES.encrypt(
          useUser[0].documento,
          process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
        ).toString()
      );
      sessionStorage.setItem("perfil", "organização");
      router.push(`organizacao/dashboard`);
    } else {
      setErro("Senha incorreta!");
    }
  };
  const Login = () => {
    return (
      <div
        style={{ maxWidth: "400px", width: "100%" }}
        className="flex mb-28 flex-col gap-6 flex-1 justify-center items-center self-center justify-self-center"
      >
        {isCadastrado ? (
          <>
            <h1 className="preto text-5xl my-4 font-extrabold">
              faça seu login
            </h1>
            <h2 className="preto text-3xl my-2 font-bold">{useErro}</h2>
          </>
        ) : (
          <h1 className="preto text-5xl my-8 font-extrabold">
            para começar, digite seu {isOng ? "CPF" : "CNPJ"}
          </h1>
        )}
        <div className="flex justify-between items-center gap-4 w-full">
          <div className="flex flex-col items-start w-full">
            <div className="flex w-full items-center">
              <TextField
                onInput={(e) => handleCnpjInput(e)}
                className="w-full flex-1"
                variant="filled"
                id={isOng ? "cpf" : "cnpj"}
                label={isOng ? "CPF" : "CNPJ"}
                placeholder={`Digite seu ${isOng ? "CPF" : "CNPJ"}`}
              />
              {isLoading ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/loading.gif" alt="Carregando..." id="loading" />
              ) : (
                <></>
              )}
            </div>
            <div
              style={{ maxHeight: "40px" }}
              className="flex items-center gap-2"
            >
              <Checkbox
                style={{ margin: "0.4rem 0" }}
                defaultChecked
                color="default"
                inputProps={{ "aria-label": "checkbox with default color" }}
                id="is_ong"
                onChange={(e) => setOng(e.target.checked)}
              />{" "}
              <label htmlFor="is_ong">Sou uma ONG</label>
            </div>
          </div>
        </div>
        {isCadastrado ? (
          <>
            <TextField
              className="w-full"
              variant="filled"
              id="senha"
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
            />
            <TextField
              className="w-min"
              variant="filled"
              id="submit_organizacao"
              type="submit"
              value="fazer login"
              onClick={(e) => handleClickLogin(e)}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };
  return (
    <div className="background">
      {Header(false)}
      {Login()}
    </div>
  );
}
