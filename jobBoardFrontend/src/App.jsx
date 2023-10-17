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
        <div className="w-2/6 sm:w-2/6 md:w-2/6 lg:w-2/6 xl-w-2/6 2xl:w-1/5 border-r-2 bg-gray-100 flex justify-center text-center">
          <Sidebar />
        </div>
        <div className="w-4/6 lg:w-5/6 overflow-hidden">
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
