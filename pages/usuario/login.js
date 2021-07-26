import { TextField } from "@material-ui/core";

import HeaderComponent from "../../components/HeaderComponent";
import {
  Body,
  Main,
} from "../../styles/styles";

export default function Login() {
  const handleCpfJustNumber = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1");
  };
  return (
    <Body>
      <HeaderComponent />
      <Main>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <TextField
            fullWidth
            type="text"
            label="CPF"
            placeholder="Digite seu CPF"
            variant="filled"
            onChange={(e) => handleCpfJustNumber(e)}
          />
        </div>
      </Main>
    </Body>
  );
}
