import {
  useEffect,
  useState,
} from "react";

/* eslint-disable @next/next/no-img-element */
import router from "next/router";

import HeaderComponent from "../../components/HeaderComponent";
import LogOut from "../../components/LogOut";
import { decrypt } from "../../services/decrypt";
import {
  Body,
  Button,
  Main,
  TextMain,
} from "../../styles/styles";

export default function DashboardUser() {
  const [useData, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const decrypted = await decrypt(sessionStorage.getItem("dados"), true);
      setData({ ...decrypted });
    };
    getData();
  }, []);
  return (
    <Body>
      <HeaderComponent Extend={<LogOut />} />
      <Main width="100%" maxWidth="800px">
        {useData ? (
          <>
            <TextMain>
              {useData.nome} {useData.sobrenome}
            </TextMain>
            <Button
              onClick={(e) => {
                e.preventDefault();
                router.push("/usuario/solicitacao");
              }}
              bgColor="primary"
              color="third"
            >
              abrir soliticação
            </Button>
          </>
        ) : (
          <>
            <img src="/loading.gif" alt="Carregando..." id="loading" />
          </>
        )}
      </Main>
    </Body>
  );
}
