import styled from "styled-components";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config";

const StyledDetails = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	z-index: 0;
`;
const StyledNote = styled.div`
	weight: 100px;
	height: 100px;
	background-color: white;
`;

export const AdoptedAnimalDetails = ({ animal, animals, animalData }) => {
	const changeAdoptedStatus = async () => {
		try {
			await setDoc(doc(db, "animals", animal.id), animal);
			await deleteDoc(doc(db, "adopted_animals", animal.id));
		} catch (error) {
			console.log("text:", error);
		}
	};

	// const updateAnimalDetails = async () => {
	// 	await db.collection("animals").doc(animal.id).update({
	// 		id: newId,
	// 		name: newName,
	// 		age: newAge,
	// 		species: newSpecies,
	// 		animalBehavior: 0,
	// 		humanBehavior: 0,
	// 		imageUrl: "",
	// 	});
	// };

	return (
		<StyledDetails key={animal.id}>
			<li>Chip number: {animal.id}</li>
			<li>Name: {animal.name}</li>
			<li>Age: {animal.age}</li>
			<li>Species: {animal.species}</li>
			<li>Behavior around other animals: {animal.animalBehavior}</li>
			<li>Behavior around humans: {animal.humanBehavior}</li>
			<button onClick={changeAdoptedStatus}>Restore to animal list</button>
			<button>Update animal details</button>
			<button>Add adopter's data</button>
			<button>Delete from list</button>
			<StyledNote>
				<div style={{ border: "1px solid black", borderRadius: "10px" }}>
					{animal.notes}
				</div>
				<button></button>
			</StyledNote>
		</StyledDetails>
	);
};
