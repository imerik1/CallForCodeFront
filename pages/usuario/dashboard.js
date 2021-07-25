/* eslint-disable @next/next/no-img-element */
import {
  useEffect,
  useState,
} from "react";

import CryptoJS from "crypto-js";
import router from "next/router";

import { TextField } from "@material-ui/core";

import { Header } from "../../components/Header";

export default function Dashboard() {
  const [useUser, setUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!sessionStorage?.getItem("perfil")) {
      alert("Você precisa realizar login primeiramente!");
      sessionStorage?.removeItem("perfil");
      sessionStorage?.removeItem("dados");
      router.push("/");
    } else if (sessionStorage?.getItem("perfil") !== "usuario") {
      alert("Você precisa ser um usuario para acessar essa página!");
      sessionStorage?.removeItem("perfil");
      sessionStorage?.removeItem("dados");
      router.push("/");
    } else {
      const decripted = CryptoJS.AES.decrypt(
        sessionStorage.getItem("dados"),
        process.env.NEXT_PUBLIC_URL_API
      ).toString(CryptoJS.enc.Utf8);
      useUser.push(JSON.parse(decripted));
      setLoading(false);
    }
  }, []);
  const handleClickLogOut = (e) => {
    e.preventDefault();
    sessionStorage?.removeItem("perfil");
    sessionStorage?.removeItem("documento");
    sessionStorage?.removeItem("dados");
    router.push("/");
  };
  const sair = () => {
    return (
      <TextField
        className="w-min log-out"
        variant="filled"
        id="log-out"
        type="submit"
        value="sair"
        onClick={(e) => handleClickLogOut(e)}
      />
    );
  };
  const handleClickSolicitacao = (e) => {
    e.preventDefault();
    router.push("/usuario/solicitacao");
  };
  return (
    <>
      {isLoading ? (
        <div className="background">
          <div
            style={{ maxWidth: "400px", width: "100%" }}
            className="flex mb-28 flex-col gap-6 flex-1 justify-center items-center self-center justify-self-center"
          >
            <img src="/loading.gif" alt="Carregando..." id="loading" />
          </div>
        </div>
      ) : (
        <>
          <div className="background">
            {Header(sair)}
            <div
              style={{ maxWidth: "400px", width: "100%" }}
              className="flex mb-28 flex-col gap-6 flex-1 justify-center items-center self-center justify-self-center"
            >
              <h1 className="preto text-3xl my-4 font-extrabold">{`Olá, ${useUser[0].nome}`}</h1>
              <TextField
                className="w-min"
                variant="filled"
                id="abrir_solicitacao"
                type="submit"
                value="abrir solicitação"
                onClick={(e) => handleClickSolicitacao(e)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

// <img src="/loading.gif" alt="Carregando..." id="loading" />
