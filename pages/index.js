import { useRouter } from "next/router";

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
        onClick={(e) => router.push("/usuario/login")}
        color="third"
        bgColor="primary"
      >
        sou usuário
      </Button>
      <Button
        onClick={(e) => router.push("/organizacao/login")}
        color="primary"
      >
        sou organização
      </Button>
    </>
  );
};

export default function Index() {
  return (
    <Body>
      <HeaderComponent Extend={Buttons()} />
      <Main>
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
