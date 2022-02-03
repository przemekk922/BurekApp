import styled from 'styled-components';
import {NavBar} from "../components/NavBar";
import {Footer} from "../components/Footer";

const StyledPageLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 0.3fr 1fr 0.2fr;
  grid-template-areas:
    "nav"
    "main"
    "footer";
`;

export const PageLayout = (props) => {
  return <StyledPageLayout><NavBar/>
  {props.children}<Footer/>
  </StyledPageLayout>;
};
