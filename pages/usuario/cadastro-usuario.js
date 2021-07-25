import {
  useEffect,
  useState,
} from "react";

import CryptoJS from "crypto-js";
import { useRouter } from "next/router";

import { TextField } from "@material-ui/core";

import { Header } from "../../components/Header";

export default function CadastroUsuario() {
  const [useCpf, setCpf] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("cpf")) {
      //router.push("/");
    } else {
      const cpf = CryptoJS.AES.decrypt(
        localStorage.getItem("cpf"),
        process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
      ).toString(CryptoJS.enc.Utf8);
      setCpf(cpf);
      //localStorage.removeItem("cpf");
    }
  }, []);
  const cadastroUsuario = () => {
    return (
      <>
        <h1 className="preto text-4xl my-8 font-extrabold">
          faça seu cadastro
        </h1>
        <div className="flex justify-between gap-4 w-full">
          <TextField
            className="flex-1"
            variant="filled"
            id="name"
            label="Nome ou nome social"
          />
          <TextField
            className="flex-1"
            variant="filled"
            id="last_name"
            label="Sobrenome"
          />
        </div>
        <div className="flex justify-between gap-4 w-full">
          <TextField
            className="flex-1"
            variant="filled"
            id="email"
            label="Email"
            type="email"
          />
          <TextField
            className="flex-1"
            variant="filled"
            id="cpf"
            value={
              useCpf
                ? useCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
                : ""
            }
            disabled
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
      </>
    );
  };
  return (
    <div className="background">
      {Header(false)}
      <div
        style={{ maxWidth: "800px", width: "100%" }}
        className="flex mb-28 flex-col gap-6 flex-1 items-center justify-center self-center justify-self-center"
      >
        {cadastroUsuario()}
      </div>
    </div>
  );
}
