import Image from "next/image";
import { useRouter } from "next/router";

import { Header } from "../components/Header";

export default function Inicio() {
  const powereds = ["ibm", "microsoft", "shawee", "fcamara"];
  const router = useRouter();
  const handleClick = (e, uri) => {
    e.preventDefault();
    router.push(`/${encodeURIComponent(uri)}`);
  };
  const Buttons = () => {
    return (
      <>
        <button
          onClick={(e) => handleClick(e, "usuario")}
          className="branco text-xl verde-background py-1 px-6 rounded-lg"
        >
          sou usuário
        </button>
        <button
          onClick={(e) => handleClick(e, "organizacao")}
          className="verde-text text-xl py-2 px-4"
        >
          sou organização
        </button>
      </>
    );
  };

  const Main = () => {
    return (
      <section className="flex px-24 flex-1 items-center">
        <div style={{ maxWidth: "426px" }}>
          <span className="preto text-7xl font-extrabold">
            o novo jeito de{" "}
            {
              <span className="verde-text text-7xl font-extrabold">
                reciclar
              </span>
            }{" "}
            seus itens
          </span>
        </div>
      </section>
    );
  };

  const Footer = () => {
    return (
      <footer
        style={{ height: "fit-content" }}
        className="min-w-full flex flex-col justify-center items-center py-14"
      >
        <p className="preto text-md bold">powered by</p>
        <div className="flex gap-14 justify-center items-center my-2">
          {powereds.map((powered, id) => {
            return (
              <div
                key={id}
                style={{
                  width: "150px",
                  maxHeight: "50px",
                  height: "50px",
                  position: "relative",
                }}
              >
                <Image
                  src={`/${powered}.png`}
                  layout="fill"
                  objectFit="contain"
                  alt={powered}
                  className="logo_powered"
                />
              </div>
            );
          })}
        </div>
      </footer>
    );
  };

  return (
    <div className="background">
      {Header(Buttons)}
      {Main()}
      {Footer()}
    </div>
  );
}
