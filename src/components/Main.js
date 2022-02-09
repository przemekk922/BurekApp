import styled from "styled-components";
import "../styles.css";

const StyledMainContent = styled.main`
	grid-area: main;
	background: rgb(72,152,62);
background: linear-gradient(173deg, rgba(72,152,62,1) 31%, rgba(231,249,179,1) 58%);
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const Main = (props) => {
	return <StyledMainContent>{props.children}</StyledMainContent>;
};
