import { useState } from "react";

import router from "next/router";

import { TextField } from "@material-ui/core";

import HeaderComponent from "../../components/HeaderComponent";
import LogOut from "../../components/LogOut";
import {
  Body,
  Button,
  Main,
  TextMain,
} from "../../styles/styles";

export default function Solicitacao() {
  const [useError, setError] = useState("");
  const [useErrorNotCompany, setErrorNotCompany] = useState("");
  const handleClickLocalization = async (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(showPosition, showError, {
        enableHighAccuracy: true,
      });
    }
    async function showPosition(position) {
      const getAllCompaniesClose = (UF, maps) => {
        fetch(`/api/orgs/get-local/${UF}/${maps.lat}/${maps.lng}`, {
          method: "GET",
          headers: headers,
        }).then((response) => {
          response.json().then(async (data) => {
            if (response.status !== 200) {
              const error = {
                code: "POSITION_UNAVAILABLE",
              };
              return showError(error);
            }
            if (data.data.length === 0) {
              return setErrorNotCompany(
                "Nenhum empresa foi encontrada em um raio de 5km de você! Tente novamente mais tarde!"
              );
            }
          });
        });
      };
      const maps = {
        lat: position?.coords?.latitude,
        lng: position?.coords?.longitude,
      };
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      fetch(`/api/maps/${encodeURI(maps.lat)}/${encodeURI(maps.lng)}`, {
        method: "GET",
        headers: headers,
      }).then((response) => {
        response.json().then(async (data) => {
          if (response.status !== 200) {
            const error = {
              code: "POSITION_UNAVAILABLE",
            };
            return showError(error);
          }
          let UF =
            data.data.results[0].address_components[4].short_name.toString();
          getAllCompaniesClose(UF, maps);
        });
      });
    }
    async function showError(error) {
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
  return (
    <Body>
      <HeaderComponent Extend={<LogOut />} />
      <Main width="100%" maxWidth="700px" style={{ gap: "1.4rem" }}>
        {useError.length > 0 ? <p>{useError}</p> : <></>}
        {useErrorNotCompany.length > 0 ? <p>{useErrorNotCompany}</p> : <></>}
        {useErrorNotCompany.length > 0 ? (
          <>
            <Button
              onClick={(e) => {
                e.preventDefault();
                router.push("/usuario/dashboard");
              }}
              bgColor="primary"
              color="third"
            >
              voltar
            </Button>
          </>
        ) : (
          <>
            <TextMain>preencha a solicitação</TextMain>
            <TextField
              fullWidth
              type="text"
              multiline
              inputProps={{ maxLength: 100 }}
              label="O que deseja reciclar?"
              id="descricao"
              placeholder="Digite o que deseja reciclar"
              variant="filled"
            />
            <Button
              onClick={(e) => handleClickLocalization(e)}
              bgColor="primary"
              color="third"
            >
              pegar a localização
            </Button>
          </>
        )}
      </Main>
    </Body>
  );
}
