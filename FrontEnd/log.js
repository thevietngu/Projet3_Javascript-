document.querySelector("#login").addEventListener("submit", function(event) {
event.preventDefault(); 

const username = document.getElementById("loginemail");
const password = document.getElementById("loginpassword");

  const donneesAEnvoyer = {
      "email": username.value,
      "password": password.value
};

  const urlApi = "http://localhost:5678/api/users/login";
  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(donneesAEnvoyer)
}


  fetch(urlApi, options)
  .then(response => {
      if (!response.ok) {
          throw new Error('La requête a échoué.');
      }
      
      return response.json();
  })
  .then(infosRecues => {
   
      localStorage.setItem("InfosLog", JSON.stringify(infosRecues));
      window.location.href ="./index.html";
      
  })
  .catch(error => {
    const afferror = document.createElement("div");
    const divresultat = document.querySelector("#resultat");
    afferror.innerText =" mauvais identifiant ou mdp"
    divresultat.appendChild(afferror);
    
    console.error('Erreur lors de la récupération des données:', error);
  })
  
});
