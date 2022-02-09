import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn, slideInLeft, slideOutLeft } from "react-animations";
import { db, storage } from "../config";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { NavLink, useLocation, useParams } from "react-router-dom";

const slideInRightAnimation = keyframes`${slideInLeft}`;
// const slideOutRightAnimation = keyframes`${slideOutRight}`;

const StyledDetails = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	z-index: 0;
	position: fixed;
	right: 0;
`;

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
		<StyledDetails key={animal.id}>
			<li>Chip number: {animal.id}</li>
			<li>Name: {animal.name}</li>
			<li>Age: {animal.age}</li>
			<li>Species: {animal.species}</li>
			<li>Behavior around other animals: {animal.animalBehavior}</li>
			<li>Behavior around humans: {animal.humanBehavior}</li>
			<li>Notes: {animal.notes}</li>
			<button onClick={changeAdoptedStatus}>Add to adopted</button>

			<button>
				<NavLink to={`/editanimaldetails/${animal.id}`}>
					Update animal details
				</NavLink>
			</button>

			<button>Delete from list</button>
		</StyledDetails>
	);
};
