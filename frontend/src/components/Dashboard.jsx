
export default function Dashboard(){

    // ce fichier c'est afficher le dashboard apres avoir clique sur le  bouton

    return(

<div className="mt-20">
        <button className="bg-blue-600 px-4 py-2 text-white text-2xl rountded-lg cursor-pointer" onClick={()=> Navigate("/dashboard")}>
        Dashboar 
        </button>


    </div>


         
    )
}