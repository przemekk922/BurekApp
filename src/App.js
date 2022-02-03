import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdoptedAnimalsCard } from "./routes/AdoptedAnimalsCard";
import { AdoptedAnimalsList } from "./routes/AdoptedAnimalsList";
import { AddPetForm } from "./routes/AddPetForm";
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
          <Route path="/addpet" element={<AddPetForm />} />
          <Route path="/adoptedanimalslist" element={<AdoptedAnimalsList />} />
          <Route path="/adoptedanimalscard" element={<AdoptedAnimalsCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
