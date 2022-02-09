import { useState, useEffect } from "react";
import styled from "styled-components";

import { Main } from "../components/Main";
import { loginUserWithEmail } from "../config";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { TextField, Rating, Button, touchRippleClasses } from "@mui/material";
// import { AnimatedDoggo } from "../components/AnimatedDoggo";

const StyledLoginForm = styled.form`
	height: 90vh;
	width: 25%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
const StyledFooter = styled.footer`
  height: 10vh;
  width: 100%;
  display: flex;
  align-items: center;
	justify-content: center;
  /* background-color: transparent;  */
	box-shadow: inset -5px 100px 99px 31px rgba(164, 239, 106, 1);
  /* background: rgb(36,0,0);
background: linear-gradient(180deg, rgba(36,0,0,1) 3%, rgba(18,89,7,1) 65%, rgba(12,121,9,1) 100%); */
  /* box-shadow: 45px -15px 24px 0px rgba(44, 190, 40, 0.75); */

`;

const StyledText = styled.span`
  color: white;
  z-index: 1000;
  & a {
	  text-decoration:none;
	  color:white;
	  padding-right: 15px;
  }
  & a:hover{
	  background:#125907;
	  box-shadow: 5px 8px 8px #125907 ;
  }

`;

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUserWithEmail(email, password, setCurrentUser);
  };
  useEffect(() => {
    if (currentUser) {
      navigate("/navigation");
    }
  }, [navigate, currentUser]);

  return (
    <>
      <Main>
        {/* <AnimatedDoggo /> */}
        <StyledLoginForm>
          <TextField
            variant="filled"
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <TextField
            variant="filled"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="success"
            sx={{
              marginTop: "13px",
            }}
          >
            Login
          </Button>
        </StyledLoginForm>
      </Main>
      <StyledFooter>
        <StyledText>
          Created by:  
          <a href="/">Przemysław Kalinowski</a>
		  <a href="/">Mariusz Walusiak</a>
          <a href="/">Aleksandra Siwczak</a>
          <a href="/">Rafał Welzant</a>
          <a href="/">Jan Krysztop</a>
        </StyledText>
      </StyledFooter>
    </>
  );
};
