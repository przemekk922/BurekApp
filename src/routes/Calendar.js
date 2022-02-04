import styled from "styled-components";
import { PageLayout } from "../components/PageLayout";
import { Main } from "../components/Main";
import "../styles.css";
import { NavLink } from "react-router-dom";

export const Calendar = () => {
	const StyledNavigation = styled.div`
		width: 25%;
		display: flex;
		flex-direction: column;
	`;

	const StyledCalendar = styled.div`
		width: 350px;
		height: 350px;
		background-color: grey;
	`;

	return (
		<PageLayout>
			<Main>
				<StyledNavigation>
					<StyledCalendar></StyledCalendar>
				</StyledNavigation>
			</Main>
			<NavLink to="/navigation">
				<button>Back</button>
			</NavLink>
		</PageLayout>
	);
};
