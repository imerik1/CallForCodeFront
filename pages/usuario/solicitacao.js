/* eslint-disable @next/next/no-img-element */
import {
  useEffect,
  useState,
} from "react";

import { TextField } from "@material-ui/core";

import { Header } from "../../components/Header";

export default function Solicitacao() {
  const [useUser, setUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (
      !sessionStorage?.getItem("documento") ||
      !sessionStorage?.getItem("perfil")
    ) {
      alert("Você precisa realizar login primeiramente!");
      sessionStorage?.removeItem("perfil");
      sessionStorage?.removeItem("documento");
      sessionStorage?.removeItem("dados");
      router.push("/");
    } else if (sessionStorage?.getItem("perfil") !== "organização") {
      alert("Você precisa ser uma organização para acessar essa página!");
      sessionStorage?.removeItem("perfil");
      sessionStorage?.removeItem("documento");
      sessionStorage?.removeItem("dados");
      router.push("/");
    } else {
      useUser.push(JSON.parse(sessionStorage.getItem("dados")));
      console.log(useUser);
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
  return (
    <>
      {isLoading ? (
        <div className="background">
          <img src="/loading.gif" alt="Carregando..." id="loading" />
        </div>
      ) : (
        <div className="background">
          {Header(sair)}
          <div
            style={{ maxWidth: "400px", width: "100%" }}
            className="flex mb-28 flex-col gap-6 flex-1 justify-center items-center self-center justify-self-center"
          >
            <h1 className="preto text-3xl my-4 font-extrabold">{`Olá, ${useUser[0].nomeEmpresa}`}</h1>
          </div>
        </div>
      )}
    </>
  );
}
