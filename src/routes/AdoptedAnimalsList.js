import styled from "styled-components";
import { PageLayout } from "../components/PageLayout.js";
import { Main } from "../components/Main.js";

const AdoptedListBar = styled.div`
	display: flex;
	width: 60%;
	min-height: 20%;
	border: 1px solid black;
	justify-content: space-between;
	margin-top: 0.5%;
`;

export const AdoptedAnimalsList = () => {
	return (
		<PageLayout>
			<Main>
				<AdoptedListBar>
					<h1>Adopted Animals List</h1>
				</AdoptedListBar>
			</Main>
		</PageLayout>
	);
};
