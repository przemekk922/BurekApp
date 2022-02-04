import styled from "styled-components";
import { useState } from "react";
import {
  collection,
  getDocs,
  deleteDocs,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL} from "@firebase/storage";
import { db, storage } from "../config";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const StyledForm = styled.form`
  margin: 0 auto;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export const AddPetForm = () => {
  const [animalData, setAnimalData] = useState({
    id: "",
    name: "",
    age: "",
    species: "",
    animalBehavior: 0,
    humanBehavior: 0,
    imageUrl: ""
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    setAnimalData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const addAnimal = async () => {
    await setDoc(doc(db, "animals", animalData.id), animalData);
  };

  
  const formHandler = (event) => {
    event.preventDefault();
    const file = event.target[0].files[0];
    uploadFiles(file);
  };
  
  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then(url => setAnimalData({
            ...animalData,
            imageUrl: url,
          }))
        }
        );
        console.log(animalData);
      };

      const handleSumbit = (event) => {
        event.preventDefault();
        addAnimal();
        setAnimalData({
          id: "",
          name: "",
          age: "",
          species: "",
          animalBehavior: 0,
          humanBehavior: 0,
          imageUrl: "",
        });
      };
  
  return (
    <>
      <StyledForm onSubmit={handleSumbit}>
        <label htmlFor="id">Id</label>
        <input
          id="id"
          placeholder="Enter pet id"
          value={animalData.id}
          type="text"
          name="id"
          onChange={handleChange}
        ></input>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="Enter pet name"
          value={animalData.name}
          type="text"
          name="name"
          onChange={handleChange}
        ></input>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          placeholder="Enter pet age"
          value={animalData.age}
          type="text"
          name="age"
          onChange={handleChange}
        ></input>
        <label htmlFor="species">Species</label>
        <input
          name="species"
          placeholder="Dog/Cat"
          value={animalData.species}
          type="text"
          name="species"
          onChange={handleChange}
        ></input>
        <Typography component="legend">
          Behavior around other animals
        </Typography>
        <StyledRating
          value={Number(animalData.animalBehavior)}
          onChange={handleChange}
          name="animalBehavior"
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
        <Typography component="legend">Behavior around humans</Typography>
        <StyledRating
          value={Number(animalData.humanBehavior)}
          onChange={handleChange}
          name="humanBehavior"
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
        <button type="submit">Add Pet</button>
      </StyledForm>

      <form onSubmit={formHandler}>
        <input type="file" />
        <h3>Uploaded {progress} %</h3>
        <button type="submit">Upload</button>
      </form>
      <div>
        <img src={animalData.imageUrl}/>
      </div>

      <button>Back</button>
    </>
  );
};
