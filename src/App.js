import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdoptedAnimalsCard } from "./routes/AdoptedAnimalsCard";
import { AdoptedAnimalsList } from "./routes/AdoptedAnimalsList";
import { AnimalsCard } from "./routes/AnimalsCard";
import { AnimalsList } from "./routes/AnimalsList";
import { Calendar } from "./routes/Calendar";
import { LoginPage } from "./routes/LoginPage";
import { Navigation } from "./routes/Navigation";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/navigation" element={<Navigation />} />
					<Route path="/calendar" element={<Calendar />} />
					<Route path="/animalslist" element={<AnimalsList />} />

					<Route path="/animalscard" element={<AnimalsCard />} />
					<Route path="/adoptedanimalslist" element={<AdoptedAnimalsList />} />
					<Route path="/adoptedanimalscard" element={<AdoptedAnimalsCard />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
export default App;
