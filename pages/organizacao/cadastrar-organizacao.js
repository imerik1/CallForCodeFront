import "leaflet/dist/leaflet.css";

import {
  useEffect,
  useState,
} from "react";

import CryptoJS from "crypto-js";
import validator from "email-validator";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { TextField } from "@material-ui/core";

import { Header } from "../../components/Header";

export default function CadastroOrganizacao() {
  const [useCpfCnpj, setCpfCnpj] = useState(false);
  const [useCoord, setCoord] = useState();
  const [useLocate, setLocate] = useState();
  const [useException, setException] = useState();
  const MyAwesomeMap = dynamic(
    () => import("../../components/Maps").then((mod) => mod.Map),
    { ssr: false }
  );
  const handleClickCadastro = (e) => {
    e.preventDefault();
    const email = document?.getElementById("email").value;
    const nome = document?.getElementById("nome").value;
    const password = document?.getElementById("senha").value;
    const confirmPassword = document?.getElementById("senha_confirmar").value;
    const numero = document?.getElementById("numero").value;
    const logradouro = `${useLocate.logradouro} ${useLocate?.complemento}`;
    const complemento = document.getElementById("complemento").value;
    const bairro = useLocate?.bairro;
    const localidade = useLocate?.localidade;
    const uf = useLocate?.uf;
    const isOng = useCpfCnpj.length === 11;
    const documento = useCpfCnpj;
    const cep = document.getElementById("cep").value;
    var exception = [];
    if (!password === confirmPassword) {
      exception.push("As senhas devem estar iguais");
    }
    if (!validator.validate(email)) {
      exception.push("O e-mail deve ser válido");
    }
    if (nome.length < 1 || senha.length < 1) {
      exception.push("Os valores não podem estar vazios, exceto o completo!");
    }
    exception.length === 0 ? setException(false) : setException(exception);
    if (exception.length === 0) {
      const body = {
        address: {
          cep: cep,
          cidade: localidade,
          complemento: complemento,
          latitude: useCoord.lat,
          longitude: useCoord.lng,
          logradouro: logradouro + " " + bairro,
          numero: numero,
          uf: uf,
        },
        documento: documento,
        email: email,
        isOng: isOng,
        nomeEmpresa: nome,
        senha: CryptoJS.AES.encrypt(
          password,
          process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
        ).toString(),
      };
      var header = new Header();
      header.append("Content-Type", "application/json");
      fetch("", {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
      }).then((res) => {
        res
          .json()
          .then((data) => {
            alert("Você foi cadastrado com sucesso!");
          })
          .then((err) => {
            alert("Ocorreu um erro, tente novamente mais tarde");
          });
      });
    }
  };
  const handleCepInput = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length === 8) {
      fetch(`https://viacep.com.br/ws/${value}/json`, { method: "GET" }).then(
        (res) => {
          res.json().then((data) => {
            if (data?.logradouro) {
              setLocate(data);
              document.getElementById(
                "logradouro"
              ).value = `${data.logradouro} ${data?.complemento}`;
              document.getElementById("bairro").value = data.bairro;
              document.getElementById("localidade").value = data.localidade;
              document.getElementById("uf").value = data.uf;
            }
          });
        }
      );
    }
  };
  const handleNumeroChange = (e) => {
    const value = e.target.value;
    const uri = encodeURI(
      `${value} ${useLocate.localidade} ${useLocate.logradouro} ${
        useLocate.uf
      } ${useLocate.cep.replace(/\D/g, "")}`
    );
    fetch(`/api/map/${uri}`, { method: "GET" }).then((res) => {
      res.json().then((data) => {
        setCoord(data);
        console.log(data);
      });
    });
  };
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("documento")) {
      router.push("/");
    } else {
      const cpfCnpj = CryptoJS.AES.decrypt(
        localStorage.getItem("documento"),
        process.env.NEXT_PUBLIC_PASSWORD_CRYPTO
      ).toString(CryptoJS.enc.Utf8);
      setCpfCnpj(cpfCnpj);
      localStorage.removeItem("documento");
    }
  }, []);
  const dadosOrg = () => {
    return (
      <>
        <h1 className="preto text-4xl my-8 font-extrabold">
          faça seu cadastro
        </h1>
        <div className="flex justify-between gap-4 w-full">
          <TextField
            className="flex-1"
            variant="filled"
            id="nome"
            label="Nome ou razão social"
          />
          <TextField
            onInput={(e) => handleCepInput(e)}
            className="flex-1"
            variant="filled"
            id="cep"
            label="CEP"
          />
        </div>
        <div className="flex justify-between gap-4 w-full">
          <TextField
            className="flex-1"
            variant="filled"
            id="email"
            label="Email para contato"
            type="email"
          />
        </div>
        <div className="flex justify-between gap-4 w-full">
          <TextField
            className="flex-1"
            variant="filled"
            id="senha"
            label="Senha"
            type="password"
          />
          <TextField
            className="flex-1"
            variant="filled"
            id="senha_confirmar"
            label="Confirmar senha"
            type="password"
          />
        </div>
      </>
    );
  };
  return (
    <div className="background">
      {Header(false)}
      <div
        style={{ maxWidth: "800px", width: "100%" }}
        className="flex mb-28 flex-col gap-6 flex-1 items-center justify-center self-center justify-self-center"
      >
        {dadosOrg()}
        {useLocate ? (
          <>
            <h1 className="preto text-4xl my-8 font-extrabold">endereço</h1>
            <div className="w-full flex flex-col gap-6">
              <TextField
                className="flex-1 w-full"
                variant="filled"
                id="logradouro"
                placeholder="Rua"
                disabled
              />
              <div className="w-full flex gap-4">
                <TextField
                  className="flex-1"
                  variant="filled"
                  id="complemento"
                  placeholder="Complemento(ex. Casa 4)"
                  label="Complemento"
                />
                <TextField
                  className="w-max-4"
                  variant="filled"
                  id="numero"
                  placeholder="Número"
                  label="Número"
                  type="number"
                  onChange={(e) => handleNumeroChange(e)}
                />
              </div>
              <div className="w-full flex gap-4">
                <TextField
                  className="flex-1 w-full"
                  variant="filled"
                  id="bairro"
                  placeholder="Bairro"
                  disabled
                />
                <TextField
                  className="flex-1 w-full"
                  variant="filled"
                  id="localidade"
                  placeholder="Cidade"
                  disabled
                />
                <TextField
                  className="w-max-2"
                  variant="filled"
                  id="uf"
                  placeholder="UF"
                  disabled
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {useCoord ? (
          <>
            <MyAwesomeMap
              latitude={useCoord.lat}
              longitude={useCoord.lng}
              nome={document.getElementById("nome")?.value}
              zoom={false}
            />
            {
              <TextField
                className="w-min"
                variant="filled"
                id="cadastro_organizacao"
                type="submit"
                value="fazer cadastro"
                onClick={(e) => handleClickCadastro(e)}
              />
            }
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
