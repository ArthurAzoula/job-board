import AdminIcon from "./icons/Admin.icon";
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import Annonces from "./components/Annonces.component";
import ConnexionPage from "./pages/Connexion.page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InscriptionPage from "./pages/Inscription.page";
import Sidebar from "./components/Sidebar.component";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen font-mono bg-white w-full flex">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5">
          <Header />
          <Routes>
            <Route path="/" element={<Annonces />} />
            <Route path="/signin" element={<ConnexionPage />} />
            <Route path="/signup" element={<InscriptionPage />} />
            <Route path="/announces" element={<Annonces />} />
            <Route path="/admin" element={<AdminIcon />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;
