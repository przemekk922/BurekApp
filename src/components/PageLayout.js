import styled from "styled-components";
import { NavBar } from "../components/NavBar";

import "../styles.css";

const StyledPageLayout = styled.div`
	display: grid;
	height: 100vh;
	grid-template-rows: 0.1fr 0.9fr;
	grid-template-areas:
		"nav"
		"main";
`;

export const PageLayout = (props) => {
	return (
		<StyledPageLayout>
			<NavBar />
			{props.children}
		</StyledPageLayout>
	);
};
