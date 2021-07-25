import { useState } from "react";

import CryptoJS from "crypto-js";
import { useRouter } from "next/router";

import { TextField } from "@material-ui/core";

import { Header } from "../../components/Header";

export default function Usuario() {
  const [isLoading, setLoading] = useState(false);
  const [isCadastrado, setCadastrado] = useState(false);
  const [useUser, setUser] = useState([]);
  const [useErro, setErro] = useState();
  const router = useRouter();
  const handleCpfInput = async (e) => {
    var value = e.target.value.replace(/\D/g, "");
    if (value.length === 11) {
      setLoading(true);
      const res = await fetch(
        `https://ecoshared-api.herokuapp.com/donators/cpf/${value}`
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
        const cpf = CryptoJS.AES.encrypt(
          value,
          process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
        ).toString();
        localStorage.setItem("documento", cpf);
        router.push("usuario/cadastrar-usuario");
      }
    }
  };
  const handleClickLogin = async (e) => {
    e.preventDefault();
    const senha = document?.getElementById("senha")?.value;
    console.log(useUser[0].senha, senha);
    if (useUser[0].senha === senha) {
      const encripted = CryptoJS.AES.encrypt(
        JSON.stringify(useUser[0]).toString(),
        process.env.NEXT_PUBLIC_URL_API
      ).toString();
      sessionStorage.setItem("dados", encripted);
      sessionStorage.setItem("perfil", "usuario");
      router.push(`usuario/dashboard`);
    } else {
      setErro("Senha incorreta!");
    }
  };
  const dadosPessoais = () => {
    return (
      <>
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
              para começar, digite seu CPF
            </h1>
          )}
          <div className="flex justify-between items-center gap-4 w-full">
            <TextField
              onInput={(e) => handleCpfInput(e)}
              className="flex-1"
              variant="filled"
              id="cpf"
              label="CPF"
              placeholder="Digite seu CPF"
            />
            {isLoading ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/loading.gif" alt="Carregando..." id="loading" />
            ) : (
              <></>
            )}
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
                id="submit_usuario"
                type="submit"
                value="fazer login"
                onClick={(e) => handleClickLogin(e)}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  };
  return (
    <div className="background">
      {Header(false)}
      {dadosPessoais()}
    </div>
  );
}
