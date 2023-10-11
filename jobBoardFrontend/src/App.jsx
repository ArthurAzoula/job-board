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
      <div className="min-h-screen font-serif bg-bleugris w-full flex">
        <div className="w-1/6 flex justify-center text-center">
          <Sidebar />
        </div>
        <div className="w-5/6 overflow-hidden">
          <Header />
          <div className="overflow-y-auto bg-white min-h-screen">
            <Routes>
              <Route path="/" element={<Annonces />} />
              <Route path="/announces" element={<Annonces />} />
              <Route path="/admin" element={<AdminIcon />} />
              <Route path="/signin" element={<ConnexionPage />} />
              <Route path="/signup" element={<InscriptionPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;
