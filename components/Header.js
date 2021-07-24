import { useRouter } from "next/router";

export const Header = (Component) => {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    <header
      style={{ height: "fit-content" }}
      className="py-10 px-24 justify-between items-center flex"
    >
      <div style={{ height: "fit-content", width: "fit-content" }}>
        <h1
          onClick={(e) => handleClick(e)}
          className="preto text-2xl font-bold cursor-pointer"
        >
          eco<span className="verde-text text-2xl font-normal">shared</span>
        </h1>
      </div>
      <div
        style={{ height: "fit-content", gap: "1.8rem" }}
        className="flex items-center "
      >
        {Component ? <Component /> : <></>}
      </div>
    </header>
  );
};
