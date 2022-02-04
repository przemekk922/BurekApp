import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import "../styles.css";

const StyledNavBar = styled.nav`
	grid-area: nav;
	background-color: yellow;
	display: flex;
	flex-direction: rows;
	justify-content: space-around;
`;
const StyledP = styled.p`
	border: ${(props) => (props.isActive ? "1px solid black" : "none")};
	padding: 1%;
`;
export const NavBar = () => {
	console.log(useLocation());
	const pathName = useLocation().pathname;

	return (
		<StyledNavBar>
			<NavLink to="/navigation">
				<StyledP isActive={pathName === "/navigation"}>Main Page</StyledP>
			</NavLink>

			<NavLink to="/addpet">
				<StyledP isActive={pathName === "/addpet"}>Add Pet</StyledP>
			</NavLink>
			<NavLink to="/animalslist">
				<StyledP isActive={pathName === "/animalslist"}>Animals List</StyledP>
			</NavLink>
			<NavLink to="/adoptedanimalslist">
				<StyledP isActive={pathName === "/adoptedanimalslist"}>
					Adopted Animals List
				</StyledP>
			</NavLink>
			<NavLink to="/calendar">
				<StyledP isActive={pathName === "/calendar"}>Calendar</StyledP>
			</NavLink>
		</StyledNavBar>
	);
};
