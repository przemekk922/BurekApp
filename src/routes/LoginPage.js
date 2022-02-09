import { useState, useEffect } from "react";
import styled from "styled-components";

import { Main } from "../components/Main";
import { loginUserWithEmail } from "../config";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { TextField, Rating, Button, touchRippleClasses } from "@mui/material";
// import { AnimatedDoggo } from "../components/AnimatedDoggo";

const StyledLoginForm = styled.form`
	height: 45.2vh;
	width: 300px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	& input {
		margin: 10px 0 10px 0;
		height: 40px;
		border-radius: 4px;
		border: 2px solid #00875a;
		text-indent: 20px;
		font-family: "Short Stack", cursive;
	}
	& button {
		font-family: "Short Stack", cursive;
		height: 40px;
		margin-top: 10px;
		border: 2px solid #00875a;
		border-radius: 4px;
		background-color: lightgray;
	}
`;
const StyledHeader = styled.h1`
	margin-top: 150px;
	font-family: "Short Stack", cursive;
	font-family: "Amatic SC", cursive;
	font-size: 50px;
	color: #e06648;
	& span {
		color: #00875a;
	}
`;
const StyledFooter = styled.footer`
	height: 10vh;
	width: 100%;
	background-color: #e06648;
	background-color: coral;
	display: flex;
	align-items: flex-end;
`;

const StyledText = styled.span`
	color: white;
	z-index: 1000;
	& a {
		text-decoration: none;
		color: white;
		padding-right: 15px;
	}
	& a:hover {
		/* background:#125907; */
		box-shadow: 5px 8px 8px #125907;
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
				<StyledHeader>
					Log into <span>BurekApp</span>
				</StyledHeader>
				<StyledLoginForm>
					<input
						type="email"
						name="email"
						placeholder="E-mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></input>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></input>
					<button type="submit" onClick={handleSubmit}>
						Login
					</button>
				</StyledLoginForm>
				<img src={process.env.PUBLIC_URL + "/dogo.gif"} width="500px" />
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
