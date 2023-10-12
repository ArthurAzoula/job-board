import { useEffect, useState } from "react";
import { accountService } from "../services/account.service";
import axios from "axios";
import { get } from "../../../jobBoardBackend/src/routes/people.route";

const Settings = () => {
  const [logged, setLogged] = useState(accountService.isLogged());
  const [user, setUser] = UseState([]);

  const token = accountService.getToken() || null;

  // Définir un useState de ton utilisateur utilisateur, setUtilisateur

  // Faire un appel api vers localhost:3000/api/users/me/{token} token est une variable

  // Afficher les infos du user sinon afficher veuillez vous connecter
  useEffect(() => {
    axios({
      method: get,
      url: `localhost:3000/api/users/me/${token}`,
      responseType: "json",
    }).then((response) => {
      if (response.status === 200) {
        setUser(response.data);
      }
    }).catch(err => console.log(err))
  });

  return (
    <>
    </>
  );
};

export default Settings;
