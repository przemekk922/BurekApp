import styled from "styled-components";

const StyledDetails = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	z-index: 0;
`;

export const AdoptedAnimalDetails = ({ animal, animals, animalData }) => {
	return (
		<StyledDetails key={animal.id}>
			<li>Name: {animal.name}</li>
			<li>Age: {animal.age}</li>
			<li>Species: {animal.species}</li>
			<li>Behavior around other animals: {animal.animalBehavior}</li>
			<li>Behavior around humans: {animal.humanBehavior}</li>
			<button>Add adopter's data</button>
		</StyledDetails>
	);
};
