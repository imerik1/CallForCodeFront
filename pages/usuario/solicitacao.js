/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import {
  useEffect,
  useState,
} from "react";

import CryptoJS from "crypto-js";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { TextField } from "@material-ui/core";

import { Header } from "../../components/Header";

export default function Solicitacao() {
  const [useUser, setUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [useLocation, setLocation] = useState([]);
  const [useError, setError] = useState();
  const [useCoord, setCoord] = useState([]);
  const [useCompanies, setCompanies] = useState([]);
  const router = useRouter();
  var company;
  const MyAwesomeMap = dynamic(
    () => import("../../components/MapsCompany").then((mod) => mod.Map),
    { ssr: false }
  );
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
  const handleClickLocalization = async (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError, {
        enableHighAccuracy: true,
      });
    }
    async function showPosition(position) {
      useCoord.length = 0;
      const maps = {
        lat: position?.coords?.latitude,
        lng: position?.coords?.longitude,
      };
      const ufs = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${maps.lat}%20${maps.lng}&key=AIzaSyAj2JutV_tpPTostOIrmuO2vPxJflliu5Q`
      );
      const uf = await ufs.json();
      const companiesget = await fetch(
        `https://ecoshared-api.herokuapp.com/collectors/range?estado=${uf.results[0].address_components[4].short_name}&latitude=${maps.lat}&longitude=${maps.lng}`
      );
      const companies = await companiesget.json();
      useCompanies.length = 0;
      useCompanies.push(companies);
      useCoord.push(maps);
      setError(false);
    }
    function showError(error) {
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
    }
  };
  const handleClickCadastrarSolicitacao = async (e) => {
    e.preventDefault();
    if (
      sessionStorage?.getItem("nome-marker") &&
      sessionStorage?.getItem("documento-marker")
    ) {
      const descricao = document?.getElementById("descricao")?.value;
      const nome = sessionStorage.getItem("nome-marker");
      const documento = sessionStorage.getItem("documento-marker");
      const fetchIdOrg = await fetch(
        `https://ecoshared-api.herokuapp.com/collectors/document/${documento}`
      );
      const dataOrg = await fetchIdOrg.json();
      const decripted = CryptoJS.AES.decrypt(
        sessionStorage.getItem("dados"),
        process.env.NEXT_PUBLIC_URL_API
      ).toString(CryptoJS.enc.Utf8);
      const fetchIdUsuario = await fetch(
        `https://ecoshared-api.herokuapp.com/donators/cpf/${
          JSON.parse(decripted).cpf
        }`
      );
      const dataUsuario = await fetchIdUsuario.json();
      const body = {
        descricao: descricao,
        idCollector: dataOrg.id,
        idDonator: dataUsuario.id,
      };
      console.log(body);
      var header = new Headers();
      header.append("Content-Type", "application/json");
      fetch("https://ecoshared-api.herokuapp.com/donators/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: header,
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
          alert("Solicitação criada com sucesso!");
          sessionStorage.removeItem("nome-marker");
          sessionStorage.removeItem("documento-marker");
          router.push("/usuario/dashboard");
        }),
          (erro) => {
            alert("Não foi possivel realizar a solicitação!");
          };
      });
    }
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
            {useCoord.length > 0 ? (
              <>
                <MyAwesomeMap
                  latitude={useCoord[0].lat}
                  longitude={useCoord[0].lng}
                  zoom={false}
                  companies={useCompanies}
                />
                <TextField
                  className="w-min"
                  variant="filled"
                  id="enviar_soliticação"
                  type="submit"
                  value="enviar solicitação"
                  onClick={(e) => handleClickCadastrarSolicitacao(e)}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
