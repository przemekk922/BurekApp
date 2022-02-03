import styled from "styled-components";
import { PageLayout } from "../components/PageLayout";
import {Main} from "../components/Main";
import "./styles.css";

const StyledLoginForm = styled.form`
  width: 25%;
  display: flex;
  flex-direction: column;
`;

export const LoginPage = () => {



  
  return (
    
    <PageLayout>
      <Main>
        <StyledLoginForm>
          <input type="email" placeholder="E-mail"></input>
          <input type="password" placeholder="Password"></input>
          <button>Login</button>
        </StyledLoginForm>
      </Main>
    </PageLayout>
  );
};
