import { db } from "../config.js";
import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

export const AnimalsList = () => {
	const [animals, setAnimals] = useState([]);

	useEffect(() => {
		const unsub = onSnapshot(collection(db, "animals"), (snapshot) => {
			const animalsList = snapshot.docs.map((doc) => doc.data());
			setAnimals(animalsList);
		});
		return () => unsub();
	}, []);

	return (
		<>
			{animals.map((animal) => {
				return (
					<p key={animal.id}>
						{animal.name} {animal.age}
					</p>
				);
			})}
		</>
	);
};
