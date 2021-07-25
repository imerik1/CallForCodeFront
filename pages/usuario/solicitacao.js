/* eslint-disable @next/next/no-img-element */
import {
  useEffect,
  useState,
} from "react";

import CryptoJS from "crypto-js";
import { useRouter } from "next/router";

import { TextField } from "@material-ui/core";

import { Header } from "../../components/Header";

export default function Solicitacao() {
  const [useUser, setUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [useLocation, setLocation] = useState([]);
  const [useError, setError] = useState();
  const router = useRouter();
  useEffect(() => {
    if (
      !sessionStorage?.getItem("dados") ||
      !sessionStorage?.getItem("perfil")
    ) {
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
    sessionStorage?.removeItem("dados");
    router.push("/");
  };
  const handleClickLocalization = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError, {
        enableHighAccuracy: true,
      });
    }
    const showPosition = (position) => {
      useLocation.push(position.coords);
      setError(false);
    };
    const showError = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError("Você negou a permissão, ative e tente novamente.");
          break;
        case error.POSITION_UNAVAILABLE:
          setError(
            "Hmm sua posição está indisponível no momento, tente novamente mais tarde."
          );
          break;
        case error.TIMEOUT:
          setError(
            "Hmm estamos demorando mais do que o necessário, tente novamente mais tarde."
          );
          break;
        case error.UNKNOWN_ERROR:
          setError("Hmm ocorreu um erro, tente novamente mais tarde.");
          break;
      }
    };
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
    <div className="background">
      {isLoading ? (
        <div
          style={{ maxWidth: "400px", width: "100%" }}
          className="flex mb-28 flex-col gap-6 flex-1 justify-center items-center self-center justify-self-center"
        >
          <img src="/loading.gif" alt="Carregando..." id="loading" />
        </div>
      ) : (
        <div className="background">
          {Header(sair)}
          <div
            style={{ maxWidth: "700px", width: "100%" }}
            className="flex mb-28 flex-col gap-6 flex-1 justify-center items-center self-center justify-self-center"
          >
            <h1 className="preto text-3xl my-4 font-extrabold">{`Olá, ${useUser[0].nome}`}</h1>
            <TextField
              className="w-full"
              fullWidth
              variant="filled"
              id="descricao"
              label="O que gostaria de reciclar?"
              multiline
              placeholder="Digite o que gostaria de reciclar..."
              inputProps={{ maxLength: 255 }}
            />
            <TextField
              className="w-full"
              variant="filled"
              id="rua"
              label="Onde é o ponto de sáida?"
              placeholder="Digite a rua..."
            />
            <TextField
              className="w-full"
              variant="filled"
              id="cidade"
              label="Digite a cidade que a rua está localizada"
              placeholder="Digite a cidade..."
            />
            <TextField
              className="w-full"
              variant="filled"
              id="bairro"
              label="Digite o bairro que a rua está localizada"
              placeholder="Digite o bairro..."
            />
            <h1 className="preto text-3xl my-4 font-extrabold">Ou</h1>
            {useError ? (
              <h2 className="preto text-1xl my-2 font-extrabold">{useError}</h2>
            ) : (
              <></>
            )}
            <TextField
              className="w-min"
              variant="filled"
              id="pegar_localizacao"
              type="submit"
              value="pegar minha localização"
              onClick={(e) => handleClickLocalization(e)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
