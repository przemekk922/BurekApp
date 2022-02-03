import styled from "styled-components";
import "../styles.css";
const StyledNavBar = styled.nav`
  grid-area: nav;
  background-color: yellow;
`;

export const NavBar = () => {
  return <StyledNavBar></StyledNavBar>;
};
