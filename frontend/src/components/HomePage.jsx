import { useNavigate } from "react-router-dom"

// ce fichier c'est pour affiche la page initiale ou l'on va clicque sur le bouton pour voire la seconde page
 
export default function HomePage()
{
    const Navigate = useNavigate();
return(
    <div className="mt-20">
        <button className="bg-blue-600 px-4 py-2 text-white text-2xl rountded-lg cursor-pointer" onClick={()=> Navigate("/dashboard")}>
            Allr Ailleurs
        </button>


    </div>
)
}