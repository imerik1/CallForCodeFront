import Image from "next/image";

import { Footer } from "../../styles/styles";

export default function FooterComponent() {
  const powereds = ["ibm", "microsoft", "shawee", "fcamara"];
  return (
    <Footer>
      <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#363636" }}>
        powered by
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          padding: "1rem 2rem",
          maxWidth: "100vw",
        }}
      >
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
    </Footer>
  );
}
