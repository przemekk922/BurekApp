import styled from "styled-components";
import { useState } from "react";

const StyledDetails = styled.ul`
	display: flex;
	flex-direction: column;
`;

export const Details = ({ animal }) => {
	const [isAdopted, setIsAdopted] = useState(false);

	const addToAdopted = () => {
		setIsAdopted((isAdopted) => isAdopted === true);
	};

	return (
		<StyledDetails key={animal.id}>
			<li>Name: {animal.name}</li>
			<li>Age: {animal.age}</li>
			<li>Species: {animal.species}</li>
			<li>Behavior around other animals: {animal.animalBehavior}</li>
			<li>Behavior around humans: {animal.humanBehavior}</li>
			<button onClick={() => addToAdopted()}>Add to adopted</button>
		</StyledDetails>
	);
};
