import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";
import {
	collection,
	getDocs,
	deleteDocs,
	setDoc,
	doc,
	serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { db, storage } from "../config";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { TextField, Rating, Button, touchRippleClasses } from "@mui/material";
import cat from "../icons/cat.png";
import { DropZone } from "./DropZone";

const StyledWrapper = styled.div`
	display: flex;
	margin: 20px 150px;
	overflow: hidden;
`;

const StyledForm = styled.form`
	margin: 20px;
	width: 50%;
	font-size: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	.MuiTypography-root {
		font-size: 20px;
	}
	.MuiRating-root {
		font-size: 50px;
	}
`;

const StyledRating = styled(Rating)({
	"& .MuiRating-iconFilled": {
		color: "#ff6d75",
		fontSize: "50px",
	},
	"& .MuiRating-iconHover": {
		color: "#ff3d47",
		fontSize: "50px",
	},
});

//zmienic na background image
const StyledImage = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(${(props) => props.src});
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
`;

const StyledDivImage = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	border: 1px solid black;
	border-radius: 5px;
`;

const EmptyDiv = styled.div`
	width: 100%;
	height: 100%;
	border: 1px solid black;
	background-image: url(${cat});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const StyledUpload = styled.div`
	width: 50%;
	margin: 20px;
	padding: 20px;
	display: flex;
	gap: 20px;
	flex-direction: column;
	justify-content: center;
`;

const StyledFormUpload = styled.form`
	display: flex;
	gap: 10px;
`;

export const AddPetForm = () => {
	const [animalData, setAnimalData] = useState({
		id: "",
		name: "",
		age: "",
		species: "",
		animalBehavior: 0,
		humanBehavior: 0,
		imageUrl: "",
		// isAdopted:false,
	});
	const [isProper, setIsProper] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const [progress, setProgress] = useState(0);
	const formRef = useRef(null);

	const handleChange = (event) => {
		setAnimalData((prevFormData) => {
			return {
				...prevFormData,
				[event.target.name]: event.target.value,
			};
		});
	};

	const handleChip = (event) => {
		setAnimalData((prevFormData) => {
			if (event.target.value.length < 15 || event.target.value.length > 15) {
				setIsProper(false);
			}
			if (event.target.value.length === 15) {
				setIsProper(true);
			}
			if (event.target.value.length > 0) {
				setIsEditing(true);
			}
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
		const file = event.target.files[0];
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
				getDownloadURL(uploadTask.snapshot.ref).then((url) =>
					setAnimalData({
						...animalData,
						imageUrl: url,
					})
				);
			}
		);
		console.log(animalData);
	};

	const handleSumbit = (event) => {
		event.preventDefault();
		if (Object.values(animalData).some((item) => !!item)) {
			alert("Fill in all fields");
			return;
		}
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
		setProgress(0);
		formRef.current.reset();
	};
	const handleBack = (event) => {
		if (Object.values(animalData).some((item) => !!item)) {
			alert("Do you want to go back without filling the form???");
		}
		return event.preventDefault();
	};

	return (
		<StyledWrapper>
			<StyledUpload>
				<StyledDivImage>
					<DropZone />
					{animalData.imageUrl ? (
						<StyledImage src={animalData.imageUrl} />
					) : (
						<EmptyDiv></EmptyDiv>
					)}
				</StyledDivImage>
				<StyledFormUpload ref={formRef}>
					<input type="file" onChange={formHandler} />
					<h3>Uploaded {progress} %</h3>
				</StyledFormUpload>
				<NavLink to="/navigation">
					<Button onClick={handleBack} variant="outlined">
						Back
					</Button>
				</NavLink>
			</StyledUpload>

			<StyledForm onSubmit={handleSumbit}>
				<label htmlFor="id">Animal chip number (15 digits)</label>
				{isEditing ? (
					isProper ? (
						<TextField
							variant="filled"
							focused
							label="Filled success"
							color="success"
							id="id"
							placeholder="Enter chip number"
							value={animalData.id}
							type="text"
							name="id"
							onChange={handleChip}
						></TextField>
					) : (
						<TextField
							error
							helperText="Incorrect chip number"
							id="id"
							placeholder="Enter chip number"
							value={animalData.id}
							type="text"
							name="id"
							onChange={handleChip}
						></TextField>
					)
				) : (
					<TextField
						id="id"
						placeholder="Enter chip number"
						value={animalData.id}
						type="text"
						name="id"
						onChange={handleChip}
					></TextField>
				)}
				{/* //////////////////////////////////////////////////////////////////////////// */}
				<label htmlFor="name">Name</label>
				<TextField
					id="name"
					placeholder="Enter pet name"
					value={animalData.name}
					type="text"
					name="name"
					onChange={handleChange}
				></TextField>
				<label htmlFor="age">Age</label>
				<TextField
					id="age"
					placeholder="Enter pet age"
					value={animalData.age}
					type="text"
					name="age"
					onChange={handleChange}
				></TextField>
				<label htmlFor="species">Species</label>
				<TextField
					name="species"
					placeholder="Dog/Cat"
					value={animalData.species}
					type="text"
					name="species"
					onChange={handleChange}
				></TextField>
				<label component="legend" htmlFor="animalBehavior">
					Behavior around other animals
				</label>
				<StyledRating
					value={Number(animalData.animalBehavior)}
					onChange={handleChange}
					name="animalBehavior"
					precision={0.5}
					icon={<FavoriteIcon fontSize="inherit" />}
					emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
				/>
				<label component="legend" htmlFor="humanBehavior">
					Behavior around humans
				</label>
				<StyledRating
					value={Number(animalData.humanBehavior)}
					onChange={handleChange}
					name="humanBehavior"
					precision={0.5}
					icon={<FavoriteIcon fontSize="inherit" />}
					emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
				/>
				<Button variant="outlined" type="submit">
					Add Pet
				</Button>
			</StyledForm>
		</StyledWrapper>
	);
};
