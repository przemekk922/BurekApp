import { animalDb } from "./config.js";
import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

function App() {
	const [animals, setAnimals] = useState([]);

	useEffect(() => {
		const unsub = onSnapshot(collection(animalDb, "animals"), (snapshot) => {
			const animalsList = snapshot.docs.map((doc) => doc.data());
			setAnimals(animalsList);
		});
		return () => unsub();
	}, []);

	return (
		<div className="App">
			{animals.map((animal) => {
				return (
					<p>
						{animal.name} {animal.age}
					</p>
				);
			})}
		</div>
	);
}
export default App;
