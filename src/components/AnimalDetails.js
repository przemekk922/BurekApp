import styled from "styled-components";
import { useState } from "react";

const StyledDetails = styled.ul`
	display: flex;
	flex-direction: column;
`;

export const Details = ({ animal }) => {
	const [isAdopted, setIsAdopted] = useState(false);

	// const changeAdoptedStatus = async () => {
	// 	await setDoc(doc(db, "adopted animals", animalData.id), animalData);
	// };

	return (
		<StyledDetails key={animal.id}>
			<li>Name: {animal.name}</li>
			<li>Age: {animal.age}</li>
			<li>Species: {animal.species}</li>
			<li>Behavior around other animals: {animal.animalBehavior}</li>
			<li>Behavior around humans: {animal.humanBehavior}</li>
			<li>Adoption status: {animal.isAdopted ? "yes" : "no"}</li>
			<button>Add to adopted</button>
		</StyledDetails>
	);
};
