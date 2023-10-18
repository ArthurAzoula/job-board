import Admin from "./pages/Admin.page";
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import Annonce from "./components/Annonce.component";
import Annonces from "./components/Annonces.component";
import ConnexionPage from "./pages/Connexion.page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InscriptionPage from "./pages/Inscription.page";
import Sidebar from "./components/Sidebar.component";
import Home from "./pages/Home.page";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen font-serif bg-bleugris w-full flex">
        <div className="hidden lg:flex w-1/6 border-r-2 bg-gray-100 justify-center text-center">
          <Sidebar />
        </div>
        <div className="w-full overflow-hidden lg:w-5/6">
          <Header />
          <div className="overflow-y-auto bg-white min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/annonces/:id" element={<Annonce />} />
              <Route path="/annonces" element={<Annonces />} />
              <Route path="/admin" element={<Admin />} />
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
