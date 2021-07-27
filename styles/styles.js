import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  background: linear-gradient(
    180deg,
    #ffffff 19.32%,
    rgba(199, 199, 199, 0.41) 100%
  );
  height: 100%;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
`;

export const Header = styled.header`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  @media screen and (max-width: 805px) {
    align-items: center;
    justify-content: center;
  }
`;

export const Main = styled.main`
  flex: 1;
  width: ${(props) => (props.width ? props.width : "fit-content")};
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "100vw")};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-self: ${(props) => (props.leftSelf ? "" : "center")};
  align-items: ${(props) => (props.left ? "" : "center")};
`;

export const Footer = styled.footer`
  height: fit-content;
  display: flex;
  flex-flow: column nowrap;
  max-width: 100vw;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`;

export const Logo = styled.h1`
  color: ${(props) => props.theme.secondary};
  font-size: 1.6rem;
  font-weight: bolder;
  cursor: pointer;
  max-width: fit-content;
  span {
    color: ${(props) => props.theme.primary};
    font-size: 1.6rem;
    font-weight: normal;
  }
`;

export const TextMain = styled.h1`
  color: ${(props) => props.theme.secondary};
  font-size: 2.5rem;
  font-weight: bolder;
  max-width: fit-content;
  padding: 1rem 0;
  span {
    font-size: 1.4rem;
  }
`;

export const Slogan = styled.span`
  color: ${(props) => props.theme[props.color]};
  font-weight: ${(props) => props.weight};
  font-size: 4rem;
  max-width: 400px;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.bgColor ? props.theme[props.bgColor] : "transparent"};
  color: ${(props) => props.theme[props.color]};
  padding: 0.8rem 3rem;
  font-weight: bold;
  border: none;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  :hover {
    background-color: ${(props) => (props.bgColor ? "#b6f120" : "transparent")};
  }
`;
