import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn, slideInLeft, slideOutLeft } from "react-animations";
import { db, storage } from "../config";
import { setDoc, doc, deleteDoc } from "firebase/firestore";

const slideInRightAnimation = keyframes`${slideInLeft}`;
// const slideOutRightAnimation = keyframes`${slideOutRight}`;

const StyledDetails = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	z-index: 0;
	animation: ${slideInRightAnimation} 1s;
`;
// const StyledDetailsWrapper = styled.div`
// border: 1px solid red;
// height: 300px;
// width:500px;
// transition: height 3s;`

export const AnimalDetails = ({ animal, animals, animalData }) => {
	// const [isAdopted, setIsAdopted] = useState(false);

	const changeAdoptedStatus = async () => {
		try {
			await setDoc(doc(db, "adopted_animals", animal.id), animal);
			await deleteDoc(doc(db, "animals", animal.id));
		} catch (error) {
			console.log("text:", error);
		}
	};

	return (
		// <StyledDetailsWrapper>
		<StyledDetails key={animal.id}>
			<li>Name: {animal.name}</li>
			<li>Age: {animal.age}</li>
			<li>Species: {animal.species}</li>
			<li>Behavior around other animals: {animal.animalBehavior}</li>
			<li>Behavior around humans: {animal.humanBehavior}</li>
			<button onClick={changeAdoptedStatus}>Add to adopted</button>
		</StyledDetails>
		// </StyledDetailsWrapper>
	);
};
