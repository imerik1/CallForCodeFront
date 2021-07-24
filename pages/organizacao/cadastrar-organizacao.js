import {
  useEffect,
  useState,
} from "react";

import CryptoJS from "crypto-js";

import { TextField } from "@material-ui/core";

import { Header } from "../../components/Header";

export default function CadastroOrganizacao() {
  const [useCpnj, setCnpj] = useState(false);
  useEffect(() => {
    const cnpj = CryptoJS.AES.decrypt(
      localStorage.getItem("cnpj"),
      process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
    ).toString(CryptoJS.enc.Utf8);
    setCnpj(cnpj);
    localStorage.removeItem("cnpj");
  }, []);
  return (
    <div className="background">
      {Header(false)}
      <div
        style={{ maxWidth: "800px", width: "100%" }}
        className="flex mb-28 flex-col gap-6 flex-1 items-center justify-center self-center justify-self-center"
      >
        <h1 className="preto text-5xl my-8 font-extrabold">
          faça seu cadastro
        </h1>
        <div className="flex justify-between gap-4 w-full">
          <TextField
            className="flex-1"
            variant="filled"
            id="name"
            label="Nome ou razão social"
          />
          <TextField
            className="flex-1"
            variant="filled"
            id="cnpj"
            value={
              useCpnj
                ? useCpnj.replace(
                    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                    "$1.$2.$3/$4-$5"
                  )
                : ""
            }
            disabled
          />
        </div>
        <div className="flex justify-between gap-4 w-full">
          <TextField
            className="flex-1"
            variant="filled"
            id="email"
            label="Email para contato"
            type="email"
          />
        </div>
        <div className="flex justify-between gap-4 w-full">
          <TextField
            className="flex-1"
            variant="filled"
            id="confirm_password"
            label="Senha"
            type="password"
          />
          <TextField
            className="flex-1"
            variant="filled"
            id="password"
            label="Confirmar senha"
            type="password"
          />
        </div>
      </div>
    </div>
  );
}
