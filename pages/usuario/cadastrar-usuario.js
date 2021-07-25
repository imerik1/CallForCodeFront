import {
  useEffect,
  useState,
} from "react";

import CryptoJS from "crypto-js";
import validator from "email-validator";
import { useRouter } from "next/router";

import {
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@material-ui/core";

import { Header } from "../../components/Header";

export default function CadastroUsuario() {
  const [useCpf, setCpf] = useState(false);
  const [useException, setException] = useState();
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("documento")) {
      router.push("/");
    } else {
      const cpf = CryptoJS.AES.decrypt(
        localStorage.getItem("documento"),
        process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
      ).toString(CryptoJS.enc.Utf8);
      setCpf(cpf);
      localStorage.removeItem("documento");
    }
  }, []);
  const handleClickCadastro = (e) => {
    e.preventDefault();
    const email = document?.getElementById("email").value;
    const nome = document?.getElementById("nome").value;
    const sobrenome = document?.getElementById("sobrenome").value;
    const senha = document?.getElementById("senha").value;
    const confirmarSenha = document?.getElementById("senha_confirmar").value;
    const documento = useCpf;
    var exception = [];
    if (!senha === confirmarSenha) {
      exception.push("As senhas devem estar iguais");
    }
    if (!validator.validate(email)) {
      exception.push("O e-mail deve ser válido");
    }
    if (nome.length < 1 || senha.length < 1) {
      exception.push("Os campos não podem estar vazios, exceto o completo!");
    }
    exception.length === 0 ? setException(false) : setException(exception);
    if (exception.length === 0) {
      const body = {
        cpf: documento,
        email: CryptoJS.AES.encrypt(
          email,
          process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
        ).toString(),
        nome: nome,
        senha: CryptoJS.AES.encrypt(
          senha,
          process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
        ).toString(),
        sobrenome: sobrenome,
      };
      var header = new Headers();
      header.append("Content-Type", "application/json");
      fetch(`https://ecoshared-api.herokuapp.com/donators/store`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert("Você foi cadastrado com sucesso!");
            router.push("/");
          },
          (error) => {
            alert("Ocorreu um erro, tente novamente mais tarde");
          }
        );
    }
  };
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
            id="nome"
            label="Nome ou nome social"
          />
          <TextField
            className="flex-1"
            variant="filled"
            id="sobrenome"
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
            id="senha"
            label="Senha"
            type="password"
          />
          <TextField
            className="flex-1"
            variant="filled"
            id="senha_confirmar"
            label="Confirmar senha"
            type="password"
          />
        </div>
        <TextField
          className="w-min"
          variant="filled"
          id="cadastro_usuario"
          type="submit"
          value="fazer cadastro"
          onClick={(e) => handleClickCadastro(e)}
        />
        {useException ? (
          <List>
            {useException.map((exception, id) => {
              return (
                <ListItem key={id}>
                  <ListItemText
                    id={`list__exception__${id}`}
                    primary={exception}
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <></>
        )}
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
