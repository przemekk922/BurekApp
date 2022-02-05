import { useState } from "react";
import styled, { keyframes } from 'styled-components';
import { fadeIn, slideInDown, slideOutUp } from 'react-animations'

const slideInDownAnimation = keyframes`${slideInDown}`
const slideOutUpAnimation = keyframes`${slideOutUp}`;


const StyledDetails = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	z-index: 0;
	animation: ${slideInDownAnimation} 1s;
	`;
// const StyledDetailsWrapper = styled.div`
// border: 1px solid red;
// height: 300px;
// width:500px;
// transition: height 3s;`

export const AnimalDetails = ({ animal}) => {
	const [isAdopted, setIsAdopted] = useState(false);

	const addToAdopted = () => {
		setIsAdopted((isAdopted) => isAdopted === true);
	};


	return (
		// <StyledDetailsWrapper>
		<StyledDetails key={animal.id }>
			<li>Name: {animal.name}</li>
			<li>Age: {animal.age}</li>
			<li>Species: {animal.species}</li>
			<li>Behavior around other animals: {animal.animalBehavior}</li>
			<li>Behavior around humans: {animal.humanBehavior}</li>
			<button onClick={() => addToAdopted()}>Add to adopted</button>
		</StyledDetails>
		// </StyledDetailsWrapper>
	);
};
