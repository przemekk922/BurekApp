import { NavLink } from "react-router-dom";
import styled from "styled-components";

import "../styles.css";

export const Navigation = () => {
  const StyledNavigation = styled.div`
    padding: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 200px;
    grid-template-areas:
      "animals" "calendar"
      "adopted" "addpet";
  `;

  const StyledAnimalsBar = styled.div`
    width: 150px;
    height: 150px;
    background-color: white;
    grid-area: animals;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const StyledCalendarBar = styled.div`
    width: 150px;
    height: 150px;
    background-color: white;
    grid-area: calendar;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const StyledAdoptedBar = styled.div`
    width: 150px;
    height: 150px;
    background-color: white;
    grid-area: adopted;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const StyledAddPetBar = styled.div`
    width: 150px;
    height: 150px;
    background-color: white;
    grid-area: addpet;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  return (
    <StyledNavigation>
      <NavLink to="/animalslist">
        <StyledAnimalsBar>Animals</StyledAnimalsBar>
      </NavLink>
      <NavLink to="/calendar">
        <StyledCalendarBar>Calendar </StyledCalendarBar>
      </NavLink>
      <NavLink to="/adoptedanimalslist">
        <StyledAdoptedBar>Adopted</StyledAdoptedBar>
      </NavLink>
      <NavLink to="/adoptedanimalscard">
        <StyledAddPetBar>Add Pet</StyledAddPetBar>
      </NavLink>
    </StyledNavigation>
  );
};
