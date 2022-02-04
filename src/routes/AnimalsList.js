import { db } from "../config.js";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { PageLayout } from "../components/PageLayout.js";
import { Main } from "../components/Main.js";
import { NavLink } from "react-router-dom";
import { Details } from "../components/AnimalDetails";

const AnimalListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: auto;
	width: 100%;
	height: 100%;
`;

const AnimalListBar = styled.div`
	display: flex;
	width: 60%;
	min-height: 20%;
	border: 1px solid black;
	justify-content: space-between;
	margin-top: 0.5%;
`;

const SearchBar = styled.div`
	/* background-color: pink;
	width: 200px;
	height: 20px; */
`;

export const AnimalsList = () => {
	const [animals, setAnimals] = useState([]);
	const [animalDetailId, setAnimalDetailId] = useState(null);

	const toggleDetailsList = (id) => {
		setAnimalDetailId((oldId) => (oldId === id ? null : id));
	};

	useEffect(() => {
		const unsub = onSnapshot(collection(db, "animals"), (snapshot) => {
			const animalsList = snapshot.docs.map((doc) => doc.data());
			setAnimals(animalsList);
		});
		return () => unsub();
	}, []);

	return (
		<PageLayout>
			<Main>
				<AnimalListWrapper>
					<SearchBar>
						<img
							src={process.env.PUBLIC_URL + "/iconmonstr-magnifier-5-240.png"}
							alt="search"
							style={{ height: "20px", width: "20px" }}
						/>
						<input></input>
					</SearchBar>
					{animals.map((animal) => {
						const { id } = animal;
						const isExpanded = animalDetailId === animal.id;
						console.log(animal.id);
						return (
							<AnimalListBar key={animal.id}>
								<img
									src={process.env.PUBLIC_URL + "/iconmonstr-cat-2-240.png"}
									alt="cat"
									style={{ height: "30px", width: "30px" }}
								/>
								{animal.name}
								<button onClick={() => toggleDetailsList(id)}>
									{!isExpanded ? "Show details" : "Hide details"}
								</button>

								{isExpanded && <Details animal={animal} />}
							</AnimalListBar>
						);
					})}
				</AnimalListWrapper>
			</Main>
		</PageLayout>
	);
};
