import router from "next/router";

import { Button } from "../styles/styles";

export default function LogOut() {
  const handleClickLogOut = (e) => {
    e.preventDefault();
    sessionStorage?.removeItem("dados");
    sessionStorage?.removeItem("documento");
    sessionStorage?.removeItem("perfil");
    router.push("/");
  };
  return <Button onClick={(e) => handleClickLogOut(e)}>sair</Button>;
}
