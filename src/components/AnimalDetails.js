import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn, slideInRight, slideOutRight } from "react-animations";
import { db, storage } from "../config";
import {
	collection,
	getDocs,
	deleteDocs,
	setDoc,
	doc,
	serverTimestamp,
} from "firebase/firestore";
import { AddPetForm } from "./AddPetForm";

const slideInRightAnimation = keyframes`${slideInRight}`;
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

	// const changeAdoptedStatus = async () => {
	// 	await setDoc(doc(db, "adopted animals", animalData.id), animalData);
	// };

	return (
		// <StyledDetailsWrapper>
		<StyledDetails key={animal.id}>
			<li>Name: {animal.name}</li>
			<li>Age: {animal.age}</li>
			<li>Species: {animal.species}</li>
			<li>Behavior around other animals: {animal.animalBehavior}</li>
			<li>Behavior around humans: {animal.humanBehavior}</li>
			<li>Adoption status: {animal.isAdopted ? "yes" : "no"}</li>
			<button>Add to adopted</button>
		</StyledDetails>
		// </StyledDetailsWrapper>
	);
};
