import { db } from "../config.js";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { PageLayout } from "../components/PageLayout.js";
import { Main } from "../components/Main.js";
import { AnimalDetails } from "../components/AnimalDetails";
import { AnimalTile } from "../components/AnimalTile.js";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "animate.css";

const AnimalListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	overflow: auto;
	width: 100%;
	height: 100%;
`;

const SearchBar = styled.div`
	/* background-color: pink;
	width: 200px;
	height: 20px; */
`;

export const AnimalsList = () => {
	const [animals, setAnimals] = useState([]);
	const [animalDetailId, setAnimalDetailId] = useState(null);
	const [query, setQuery] = useState("");

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
						<input
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Enter animal's name"
						/>
					</SearchBar>

					<AnimalTile
						animals={animals}
						animalDetailId={animalDetailId}
						query={query}
						toggleDetailsList={toggleDetailsList}
					/>

					{/* {animals
            .filter((animal) => {
              if (query === "") {
                return animal;
              } else if (
                animal.name.toLowerCase().includes(query.toLocaleLowerCase())
              ) {
                return animal;
              }
            })
            .map((animal) => {
              const { id } = animal;
              const isExpanded = animalDetailId === animal.id;
              console.log(animal.id);
              return (
								//Czy kazdy element nie powinien byc <li> ???
								<>
                <AnimalListBar key={animal.id}>
                  <StyledImgBox
                    style={{ backgroundImage: `url(${animal.imageUrl})` }}
                  ></StyledImgBox>
                  <p>{animal.name}</p>
                  <button onClick={() => toggleDetailsList(id)}>
                    {!isExpanded ? "Show details" : "Hide details"}
                  </button>

                </AnimalListBar>
									{isExpanded && <AnimalDetails animal={animal} />}
									</>
              );
            })} */}
				</AnimalListWrapper>
			</Main>
		</PageLayout>
	);
};
