import {
  useEffect,
  useState,
} from "react";

import CryptoJS from "crypto-js";
import { useRouter } from "next/router";

import { TextField } from "@material-ui/core";

import { Header } from "../../components/Header";

export default function CadastroOrganizacao() {
  const [useCpfCnpj, setCpfCnpj] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("documento")) {
      //router.push("/");
    } else {
      const cpfCnpj = CryptoJS.AES.decrypt(
        localStorage.getItem("documento"),
        process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
      ).toString(CryptoJS.enc.Utf8);
      setCpfCnpj(cpfCnpj);
      //localStorage.removeItem("documento");
    }
  }, []);
  const dadosOrg = () => {
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
            label="Nome ou razão social"
          />
          <TextField className="flex-1" variant="filled" id="cep" label="CEP" />
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
        {dadosOrg()}
        <h1 className="preto text-4xl my-8 font-extrabold">endereço</h1>
      </div>
    </div>
  );
}
