import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { accountService } from "../services/account.service";
import axios from "axios";

const Admin = () => {
  let navigate = useNavigate();

  const [logged, setLogged] = useState(accountService.isLogged());
  const [user, setUser] = useState([]);
  const token = accountService.getToken() || null;

  useEffect(() => {
    if (logged) {
      axios({
        method: "GET",
        url: `http://localhost:3000/api/auth/me/${token}`,
        responseType: "json",
      })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setUser(response.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/");
    }
  }, [logged, token]);

  if (!user.isAdmin) {
    navigate("/");
  }

  return (
    <>
      <h1>Bienvenue sur la page ADMINISTRATEUR</h1>
    </>
  );
};

export default Admin;
