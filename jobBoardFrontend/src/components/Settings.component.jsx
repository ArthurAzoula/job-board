import { useEffect, useState } from "react";
import { accountService } from "../services/account.service";
import axios from "axios";


const Settings = () => {
  const [logged, setLogged] = useState(accountService.isLogged());
  const [user, setUser] = useState([]);

  const token = accountService.getToken() || null;

  // Définir un useState de ton utilisateur utilisateur, setUtilisateur

  // Faire un appel api vers localhost:3000/api/users/me/{token} token est une variable

  // Afficher les infos du user sinon afficher veuillez vous connecter
  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:3000/api/users/me/${token}`,
      responseType: "json",
    }).then((response) => {
      if (response.status === 200) {
        console.log(response.data)
        setUser(response.data);
      }
    }).catch(err => console.log(err))
  }, []);

  return (
    <div>
      <li>{user.email}</li>
      <li>{user.prenom}</li>
      <li>{user.nom}</li>
      <li>{user.telephone}</li>
      <li>{user.createdAt}</li>
    </div>
  );
};

export default Settings;
