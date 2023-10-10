import AdminIcon from "./icons/Admin.icon"
import Header from "./components/Header.component"
import Footer from "./components/Footer.component"
import Annonces from "./components/Annonces.component";
import ConnexionPage from "./pages/Connexion.page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InscriptionPage from "./pages/Inscription.page";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Annonces />}></Route>
          <Route path="/signin" element={<ConnexionPage />}></Route>
          <Route path="/signup" element={<InscriptionPage />}></Route>
          <Route path="/announce/{ID}" element={<AnnoncePage />}></Route>
          <Route path="/announces" element={<Annonces />}></Route>
          <Route path="/admin" element={<Admin />}></Route>


        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;