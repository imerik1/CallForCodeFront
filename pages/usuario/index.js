import { useState } from "react";

import CryptoJS from "crypto-js";
import { useRouter } from "next/router";

import { TextField } from "@material-ui/core";

import { Header } from "../../components/Header";

export default function Usuario() {
  const [isLoading, setLoading] = useState(false);
  const [isCadastrado, setCadastrado] = useState(false);
  const router = useRouter();
  const handleCpfInput = async (e) => {
    var value = e.target.value.replace(/\D/g, "");
    if (value.length === 11) {
      setLoading(true);
      setTimeout(async () => {
        setLoading(false);
        setCadastrado(true);
        if (!isCadastrado) {
          const cpf = CryptoJS.AES.encrypt(
            e.target.value.replace(/\D/g, ""),
            process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
          ).toString();
          localStorage.setItem("cpf", cpf);
        }
      }, 5000);
    }
  };
  return (
    <div className="background">
      {Header(false)}
      <div
        style={{ maxWidth: "400px", width: "100%" }}
        className="flex mb-28 flex-col gap-6 flex-1 items-center justify-center self-center justify-self-center"
      >
        {isCadastrado ? (
          <h1 className="preto text-5xl my-8 font-extrabold">faça seu login</h1>
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
          <div className="flex justify-between items-center gap-4 w-full">
            <TextField
              className="flex-1"
              variant="filled"
              id="senha"
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
