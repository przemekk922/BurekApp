import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import "../styles.css";

const StyledNavBar = styled.nav`
	grid-area: nav;
	background-color: yellow;
	display: flex;
	flex-direction: rows;
	justify-content: space-around;
	align-items: center;
	color: #e06648;
	background-color: white;
	border-bottom: 2px solid #00875a;
`;
const StyledP = styled.p`
	border: ${(props) =>
		props.isActive ? "1px solid black" : "1px solid transparent"};
	padding: 1%;
	width: 150px;
	height: 60px;
	text-decoration: none;
	color: #e06648;
	font-size: 17px;
`;

const StyledLink = styled(NavLink)`
	diplay: flex;
	align-items: center;
`;
export const NavBar = () => {
	const { pathname: pathName } = useLocation();

	return (
		<StyledNavBar>
			<NavLink to="/navigation">
				<StyledP isActive={pathName === "/navigation"}>Main Page</StyledP>
			</NavLink>

			<NavLink to="/addpet">
				<StyledP isActive={pathName === "/addpet"}>Add Pet</StyledP>
			</NavLink>
			<NavLink to="/animalslist">
				<StyledP isActive={pathName === "/animalslist"}>Animals</StyledP>
			</NavLink>
			<NavLink to="/adoptedanimalslist">
				<StyledP isActive={pathName === "/adoptedanimalslist"}>
					Adopted Animals
				</StyledP>
			</NavLink>
			<NavLink to="/calendar">
				<StyledP isActive={pathName === "/calendar"}>Calendar</StyledP>
			</NavLink>
		</StyledNavBar>
	);
};
