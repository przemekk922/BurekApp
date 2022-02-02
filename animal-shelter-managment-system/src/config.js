import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_DEV_API_KEY,
	authDomain: "burek-f67fb.firebaseapp.com",
	projectId: "burek-f67fb",
	storageBucket: "burek-f67fb.appspot.com",
	messagingSenderId: "305518071051",
	appId: "1:305518071051:web:5db5fb79d1eb474658260e",
	measurementId: "G-WJEHQD0Z92",
};

const firebaseApp = initializeApp(firebaseConfig);

export const animalDb = getFirestore(firebaseApp);
