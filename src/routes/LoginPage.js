import { useState, useEffect } from 'react';
import styled from "styled-components";
import { PageLayout } from "../components/PageLayout";
import {Main} from "../components/Main";
import { loginUserWithEmail} from '../config';
import { useNavigate } from "react-router-dom";
import "../styles.css";

const StyledLoginForm = styled.form`
  width: 25%;
  display: flex;
  flex-direction: column;
`;

export const LoginPage = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUserWithEmail(email, password, setCurrentUser);
    } 
    useEffect(() => {
      if (currentUser) {
          navigate('/navigation');
      }
  }, [navigate, currentUser]);


  return (
    
    <PageLayout>
      <Main>
        <StyledLoginForm>
          <input type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
          <button type="submit" onClick={handleSubmit}>Login</button>
        </StyledLoginForm>
      </Main>
    </PageLayout>
  );
};
