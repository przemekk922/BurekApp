import styled from "styled-components";
import "../styles.css";
const StyledFooter = styled.footer`
	grid-area: footer;
	background-color: blue;
	color: rgba(0, 0, 0, 0.534);
	display: flex;
	align-items: flex-end;
`;

export const Footer = () => {
	return <StyledFooter>Created by: </StyledFooter>;
};
