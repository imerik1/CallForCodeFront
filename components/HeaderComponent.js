import { useRouter } from "next/router";

import {
  Header,
  Logo,
} from "../styles/styles";

export default function HeaderComponent({ Extend }) {
  const router = useRouter();
  return (
    <Header>
      <Logo onClick={(e) => router.push("/")}>
        eco<span>shared</span>
      </Logo>
      <div
        style={{
          display: "flex",
          maxWidth: "fit-content",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {Extend}
      </div>
    </Header>
  );
}
