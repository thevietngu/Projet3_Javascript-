import { test } from "./test.js";

let objets = window.localStorage.getItem('Objets');

console.log(objets);

if (objets === null) {
    const reponse =  await fetch('http://localhost:5678/api/works');
    objets = await reponse.json();
    const valeurObjets = JSON.stringify(objets);
    window.localStorage.setItem("Objets", valeurObjets);
} else {
    objets = JSON.parse(objets);
}


function genererprojets(objets){
    for (let i = 0; i < objets.length; i++) {

        const article = objets[i];

        console.log(article);
        const gallery = document.querySelector(".gallery");
       
        const projElement = document.createElement("figure");
        
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;

        const nomElement = document.createElement("figcaption");
        nomElement.innerText = article.title;

       
        gallery.appendChild(projElement);
        
        projElement.appendChild(imageElement);
        projElement.appendChild(nomElement);
          
     }
    
}

genererprojets(objets);


// Gestion des boutons de filtres

const boutonTrierTous = document.querySelector(".btntrier-tous");
const btntrierObjets = document.querySelector(".btntrier-objets");
const btntrierAppartements = document.querySelector(".btntrier-appartements");
const btntrierHhotelRestaurant = document.querySelector(".btntrier-hotelrestaurant");


boutonTrierTous.addEventListener("click", function () {
        
    window.localStorage.removeItem("Objets");
    const objetsfiltrees = objets.filter(function(objet){
            return objet;
        });
            document.querySelector(".gallery").innerHTML = "";
            genererprojets(objetsfiltrees);
});
    
  
btntrierObjets.addEventListener("click", function (){
    
    const objetsfiltrees = objets.filter(function(objet){
        return objet.category.name == "Objets";

    });
    
    document.querySelector(".gallery").innerHTML = "";
    genererprojets(objetsfiltrees);
});

btntrierAppartements.addEventListener("click", function (){

    const objetsfiltrees = objets.filter(function(objet){
        return objet.category.name == "Appartements";

    });
    
    document.querySelector(".gallery").innerHTML = "";
    genererprojets(objetsfiltrees);
});

btntrierHhotelRestaurant.addEventListener("click", function (){
    
    const objetsfiltrees = objets.filter(function(objet){
        return objet.category.name == "Hotels & restaurants";

    });
    
    document.querySelector(".gallery").innerHTML = "";
    genererprojets(objetsfiltrees);
});

