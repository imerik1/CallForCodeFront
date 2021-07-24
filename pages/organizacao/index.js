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
  const router = useRouter();
  const handleCnpjInput = (e) => {
    var value = e.target.value.replace(/\D/g, "");
    if ((isOng && value.length === 11) || (!isOng && value.length === 14)) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (!isCadastrado) {
          const cnpj = CryptoJS.AES.encrypt(
            e.target.value.replace(/\D/g, ""),
            process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
          ).toString();
          localStorage.setItem("cnpj", cnpj);
          router.push("organizacao/cadastrar-organizacao");
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
              style={{ minHeight: "40px" }}
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
