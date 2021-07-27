import { useEffect } from "react";

import router, { useRouter } from "next/router";

import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/index/FooterComponent";
import {
  Body,
  Button,
  Main,
  Slogan,
} from "../styles/styles";

const Buttons = () => {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault();
          router.push("/usuario/login");
        }}
        color="third"
        bgColor="primary"
      >
        sou usuário
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          router.push("/organizacao/login");
        }}
        color="primary"
      >
        sou organização
      </Button>
    </>
  );
};

export default function Index() {
  useEffect(() => {
    if (sessionStorage?.getItem("dados") && sessionStorage?.getItem("perfil")) {
      if (sessionStorage?.getItem("perfil") === "usuario") {
        router.push("/usuario/dashboard");
      } else {
        router.push("/organizacao/dashboard");
      }
    } else {
      sessionStorage.removeItem("dados");
      sessionStorage.removeItem("perfil");
    }
  }, []);
  return (
    <Body>
      <HeaderComponent Extend={Buttons()} />
      <Main left={true} leftSelf={true}>
        <div style={{ maxWidth: "426px" }}>
          <Slogan color="secondary" weight="bold">
            o novo jeito de{" "}
            <Slogan color="primary" weight="bolder">
              reciclar{" "}
            </Slogan>
            seus itens
          </Slogan>
        </div>
      </Main>
      <FooterComponent />
    </Body>
  );
}
