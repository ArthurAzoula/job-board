import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Annonce = () => {
    const [annonce, setAnnonce] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/advertissements/${id}`)
    })


    return (
        <div>
            <h1>test</h1>
        </div>
    );
}   

export default Annonce;