import {useLocation, useParams} from "react-router-dom";

// ce fichier est creer pour gerer les params des utilisateurs sur le navigateur

export default function EssaiRoutage()
{

    const location = useLocation();

    const {params} = useParams();

    const urlParams = new URLSearchParams(location.search);
    const nom = urlParams.get("name");
    const prenom = urlParams.get("prenom");


    return (
        <div>
            <h2>URL Actuelle :</h2>
            <p>Pathname : {location.pathname}</p>
            <p>Search : {location.search}</p>
            <p>Hash : {location.hash}</p>
            {params && <p>Parmatre passes en URL : {params}</p>}
            {nom && <p>Query params : {nom}</p>}
            {prenom && <p>Query params : {prenom}</p>}
        </div>
    )
}