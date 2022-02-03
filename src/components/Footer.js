import styled from "styled-components";
import "../styles.css";
const StyledFooter = styled.footer`
  grid-area: footer;
  background-color: blue;
`;

export const Footer = () => {
  return <StyledFooter></StyledFooter>;
};
