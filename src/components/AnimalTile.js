import styled from "styled-components";
import { AnimalDetails } from "../components/AnimalDetails";

const AnimalListBar = styled.div`
  display: flex;
  width: 60%;
  min-height: 20%;
  border: 1px solid black;
  justify-content: space-between;
  margin-top: 0.5%;
  background-color: green;
  z-index: 1;
`;

const StyledImgBox = styled.div`
  height: 100%;
  width: 15%;
  border: 1px solid black;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const AnimalTile = ({
  animals,
  animalDetailId,
  query,
  toggleDetailsList,
}) => {
  return (
    <>
      {animals
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
              {isExpanded && <AnimalDetails isExpanded={isExpanded}animal={animal} />}
            </>
          );
        })}
      
    </>
  );
};
