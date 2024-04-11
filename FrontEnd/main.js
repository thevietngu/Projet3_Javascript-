// Récupération des projets

const Urlapi = 'http://localhost:5678/api/works'
let objets;

try {
    const reponse = await fetch(Urlapi);
    if (!reponse.ok) {
        throw new Error('La requête a échoué.');
    }
     objets = await reponse.json();
    // Utilisez les objets récupérés ici
} catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
}

 // Verification si mode admin ou non, si oui données d'auhtentification ( id + token stockée sur le local storage)

function Logadmin() {
    const StoredData = JSON.parse(localStorage.getItem("InfosLog"));
    if (StoredData) {
        const edition = document.getElementById("resultat");
        // edition.innerHTML = JSON.stringify(StoredData);
        edition.style.display = "block";
        edition.style.marginBottom ='20px';

        const header = document.querySelector("header");
        header.style.margin ='0';
        header.style.width ="100%"
    

        const loginbtn = document.getElementById("Login");
        const logoutbtn = document.getElementById("logout");

        loginbtn.style.display = "none";
        logoutbtn.style.display = "inline";

        const openModalBtn = document.getElementById('openModalBtn');
        openModalBtn.style.display="inline-flex";

    }
}  

// gestion des click login et log out 

const logoutbtn = document.getElementById("logout");

logoutbtn.addEventListener("click", function (event) {
    
    localStorage.clear();
       
        const loginbtn = document.getElementById("Login");


        loginbtn.style.display = "inline";
        logoutbtn.style.display = "none";
        window.location.href ="./index.html";

}
);

Logadmin();


// Gestiond de la modale admin ( Generer tous les projets et leur attribuer un bonton de suppression)

const modal = document.getElementById('Modalstep1');
const galleryModal = document.querySelector("#step1");
const galleryaccueil = document.querySelector(".gallery");

openModalBtn.addEventListener('click', function() {
    modal.style.display = 'block';
    modalcontent1.style.display = "block";

    // Effacer le contenu de la modalité
    galleryModal.innerHTML = "";

    // Récupérer les projets depuis l'API
    fetch('http://localhost:5678/api/works')
        .then(response => {
            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }
            return response.json();
        })
        .then(objets => {
            // Afficher les projets dans la modalité avec les boutons de suppression
            displayprojets(objets, true); // true pour indiquer mode admin
            attachDeleteListeners(); // Attacher les écouteurs d'événements aux boutons
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
});

// Fonction de mise à jour des projets par une requete fetch

function majproj() {

  const galleryaccueil = document.querySelector(".gallery");
  const gallerymodal = document.querySelector("#step1");
  const modalcontent = document.getElementById('modal-content');
  galleryaccueil.innerHTML ="";
  gallerymodal.innerHTML ="";
  modalcontent.style.display = "none";
  modalcontent.style.display = "block";

  const Urlapi = 'http://localhost:5678/api/works';
  fetch(Urlapi)
      .then(response => {
          if (!response.ok) {
              throw new Error('La requête a échoué.');
          }
          return response.json();
      })
      .then(objets => {
          displayprojets(objets)
          displayprojets(objets, true);
          
          
      })
      .catch(error => {
          console.error('Erreur lors de la récupération des données:', error);
      });
}

const prevButton = document.getElementById('prevButton');


prevButton.addEventListener('click', function() {
    modalcontent2.style.display = 'none'; 
    modalcontent1.style.display = 'block'; 
});


// gestion de femeture des modale + Maj des projets affichés.

const  closeModalBtn = document.querySelectorAll('.close');
closeModalBtn.forEach(function(button) {
      button.addEventListener('click', function() {
        modal.style.display = 'none';
        modalcontent1.style.display ="none";
        modalcontent2.style.display ="none";
        majproj();
        const preview = document.querySelector('#imagePreview');
        preview.style.display ="none";
        const previcon = document.getElementById("Previewicon");
        previcon.style.display="inline-flex";
        const fileinput = document.getElementById('photo');
        fileinput.style.display="inline-flex";
        
      });
  });
  

window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    majproj();
    const preview = document.querySelector('#imagePreview');
        preview.style.display ="none";
        const previcon = document.getElementById("Previewicon");
        previcon.style.display="inlin-flex";
        const fileinput = document.getElementById('photo');
        fileinput.style.display="inlin-flex";
  }
});


// Gestion de la deuxièeme modale formulaire d'ajout du projet( même modale mais contenu qui diffère) 

const openModalBtnaddprojet = document.getElementById("ModalFormBtn");
const modalcontent1 = document.getElementById("modal-content");
const modalcontent2 = document.getElementById("modal-content2");


openModalBtnaddprojet.addEventListener("click", function(event){

    modalcontent1.style.display ="none"
    
    modalcontent2.style.display ="block"
    const fileinput = document.getElementById('photo');
    fileinput.style.display="none";
    

})

// gestion de la preview de l'image

function previewImage() {
    const preview = document.querySelector('#imagePreview');
    preview.style.display ="block";
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
 

    reader.onloadend = function () {
      preview.innerHTML = '';
      const img = document.createElement('img');
      img.src = reader.result;
      img.style.width = '100%';
      img.style.height = '100%';
      preview.appendChild(img);
      const file = document.getElementById("photo");
      file.style.display ="none";
      const previcon = document.getElementById("Previewicon");
      previcon.style.display="none";
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.innerHTML = '';
      preview.style.display="none";
    }
}

// Gestion du formulaire d'ajout de projet

const inputphotochange = document.getElementById("photo");
inputphotochange.addEventListener("change", function(){
    
    previewImage()
});

 const form = document.getElementById('formnewproj');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const file = document.getElementById('photo').files[0]; 
        const texte = document.getElementById('texte').value;
        const listcat = document.getElementById('listcat').value;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', texte);
        formData.append('category', listcat);
        

        addproj(formData);
        form.reset();
        const preview = document.querySelector('#imagePreview');
        preview.style.display ="none";
        const previcon = document.getElementById("Previewicon");
        previcon.style.display="inline-flex";
        const fileinput = document.getElementById('photo');
        fileinput.style.display="none";
      });


// récupération des categories pour la liste déroulante

const Urlapicat= 'http://localhost:5678/api/categories'
let categorydata;

try {
    const reponse = await fetch(Urlapicat);
    if (!reponse.ok) {
        throw new Error('La requête a échoué.');
    }
     categorydata = await reponse.json();
    
} catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
}

const selectcat = document.getElementById("listcat");
categorydata.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    selectcat.appendChild(option);

});


// Fonction de l'affichage des projets dans le DOM avec deux usages admin ( affichage dans la modale) et user ( afffichage dans la page d'accueil)

function displayprojets(objets, isAdmin) {
  objets.forEach(article => {
      const projElement = document.createElement("figure");
      const imgElement = document.createElement("img");

      imgElement.src = article.imageUrl;

      if (isAdmin) {
          const deletebtn = document.createElement("button");
          const imgDeleteBtn = document.createElement('img');

          projElement.style.position = "relative";
          projElement.style.display = "inline-block";

          const idproj = article.id;
          deletebtn.id = `deletebutton${idproj}`;

          imgDeleteBtn.src = "./assets/images/trash-can-solid.png";
          imgDeleteBtn.alt = "Supprimer le projet";
          imgDeleteBtn.style.width = "14px";
          imgDeleteBtn.style.height = "14px";
          imgDeleteBtn.style.top = "5.5px";
          imgDeleteBtn.style.right = "5.25px";
          imgDeleteBtn.style.position = "absolute";
          imgDeleteBtn.style.backgroundColor = "black";

          deletebtn.appendChild(imgDeleteBtn);
          projElement.appendChild(deletebtn);
      }

      projElement.appendChild(imgElement);

      if (isAdmin) {
          galleryModal.appendChild(projElement);
      } else {
          const nomElement = document.createElement("figcaption");
          nomElement.innerText = article.title;
          galleryaccueil.appendChild(projElement);
          projElement.appendChild(nomElement);
      }
  });
}

// affichage des projets par défault sans évenement particulier

majproj();

// fonction d'ajout des projets qui récupére une data(file image, string titre et int category id ) pour l'envoyer à l'api + fermeture de la modale , puis maj proj()

function addproj(data) {

    const token = JSON.parse(localStorage.getItem("InfosLog"));
    const tokenBearer = `Bearer ${token.token}`;
    const options = {
  method: 'POST',
  headers: {
    'accept': 'application/json',
    'Authorization': tokenBearer
  },
  body: data
};

const Urlapi = "http://localhost:5678/api/works";
console.log("Option :" + data)
fetch(Urlapi, options)
  .then(response => {
    if (!response.ok) {
      throw new Error('La requête a échoué.');
    }
    
    const  closeModalBtn = document.querySelector('.close');
    closeModalBtn.click();
    
    console.log('L\'élément a été ajouté avec succès.');
  })
  .catch(error => {
    console.error('Erreur lors de la création de l\'élément:', error);
  });

}


// function boucle qui permet de garder actifs les boutons de suppression après premiere utilisation d'un des boutons de supprression ou ouverture fermeture de modale

function attachDeleteListeners() {
  const deleteButtons = document.querySelectorAll('[id^="deletebutton"]');
  deleteButtons.forEach(bouton => {
      bouton.addEventListener('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          const id = bouton.id.match(/\d+/)[0];
          deleteproj(id);
      });
  });
}

// fonction de suppression des projets

function deleteproj(id) {
  const token = JSON.parse(localStorage.getItem("InfosLog"));
  const tokenBearer = `Bearer ${token.token}`;
  const options = {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': tokenBearer
      }
  };
  const Urlapi = `http://localhost:5678/api/works/${id}`;
  fetch(Urlapi, options)
      .then(response => {
          if (!response.ok) {
              throw new Error('La requête a échoué.');
          }
          console.log(`L'élément avec l'id ${id} a été supprimé avec succès.`);
          openModalBtn.click();
      })
      .catch(error => {
          console.error(`Erreur lors de la suppression de l'élément avec l'id ${id}:`, error);
      });
}

// Gestion des boutons de filtres

const boutonTrierTous = document.querySelector(".btntrier-tous");
const btntrierObjets = document.querySelector(".btntrier-objets");
const btntrierAppartements = document.querySelector(".btntrier-appartements");
const btntrierHhotelRestaurant = document.querySelector(".btntrier-hotelrestaurant");


boutonTrierTous.addEventListener("click", function () {

    const objetsfiltrees = objets.filter(function (objet) {
        return objet;
    });
    document.querySelector(".gallery").innerHTML = "";
    displayprojets(objetsfiltrees);
});


btntrierObjets.addEventListener("click", function () {

    const objetsfiltrees = objets.filter(function (objet) {
        return objet.category.name == "Objets";

    });

    document.querySelector(".gallery").innerHTML = "";
    displayprojets(objetsfiltrees);
});

btntrierAppartements.addEventListener("click", function () {

    const objetsfiltrees = objets.filter(function (objet) {
        return objet.category.name == "Appartements";

    });

    document.querySelector(".gallery").innerHTML = "";
    displayprojets(objetsfiltrees);
});

btntrierHhotelRestaurant.addEventListener("click", function () {

    const objetsfiltrees = objets.filter(function (objet) {
        return objet.category.name == "Hotels & restaurants";

    });

    document.querySelector(".gallery").innerHTML = "";
    displayprojets(objetsfiltrees);
});


// Vider le local storage à chaque fermmeture de page pour que l'admin dove saisir ses identifiants à chaque visite

window.addEventListener('beforeunload', function(event) {
    localStorage.clear();
});