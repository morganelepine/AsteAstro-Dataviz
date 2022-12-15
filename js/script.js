/*Mode Noël*/
let boutonNoel = document.getElementById("modeNoel");
boutonNoel.onclick = function noelMode() {
 
    let baliseLink = document.getElementById("css");
    let etat = baliseLink.href.endsWith("/css/style.css");
 
    if (etat == true) {
        baliseLink.setAttribute("href", "/css/style-sombre.css");
        boutonNoel.textContent = "Toggle to the boring mode"
    } else {
        baliseLink.setAttribute("href", "/css/style.css");
        boutonNoel.textContent = "Toggle to the Christmas mode"
    }
}

//Afficher l'image uniquement lorsqu'une date est sélectionnée
document.getElementById("date").oninput = function () {
  fetchData();
  hidePictureDescription();
  let oldTitleh2 = document.getElementsByTagName("h2");

  if (oldTitleh2.length === 0) {
    addTitreAPOD();
    addSousTitreNEO();
    addTitreNEO();
  }
};

//Afficher les infos de l'asteroide lorsqu'on clique sur la terre
document.getElementById("earth").onclick = function () {
  fetchAsteroides();
  hideAsteroidDescription();
};

//Récupérer la date saisie
function dateSaisie() {
  const saisie = document.getElementById("date").value;
  return saisie;
}

//Afficher l'image du jour (API APOD)
const url =
  "https://api.nasa.gov/planetary/apod?api_key=byMXZRYPDymQvCcgAEarTFUmCZVtf4OXrnRu5UPY&date=";

function fetchData() {
  fetch(url + dateSaisie() + "&")
    .then((response) => {
      return response.json();
    })
    .then((nasaData) => {
      console.log(nasaData);
      if (nasaData.code == 400) {
        const error = document.querySelector("#oups");
        error.style.setProperty("display", "block");
        error.innerHTML = nasaData.msg;
      } else {
        const title = document.querySelector("#title");
        title.innerHTML = nasaData.title;
        const photo = document.querySelector("#photo");
        photo.src = nasaData.url;
        const description = document.querySelector("#description-picture");
        description.innerHTML = nasaData.explanation;
      }
    });
}

//Afficher les astéroides (API NeoWS)
const startURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date=";
const endURL = "&api_key=byMXZRYPDymQvCcgAEarTFUmCZVtf4OXrnRu5UPY";

function fetchAsteroides() {
  fetch(startURL + dateSaisie() + "&end_date=" + dateSaisie() + endURL)
    .then((response) => {
      return response.json();
    })
    .then((asteroides) => {
      console.log(asteroides);
      const name = document.querySelector("#nom");
      const dateToString = dateSaisie().toString();
      const dictionnaire = {
        false: "No",
        true: "Yes",
      };
      name.innerHTML = `<span><img src="/images/fleche.png"/></span> His name : ${asteroides.near_earth_objects[dateToString][0].name}`;
      const diameter_min = document.querySelector("#diametre_min");
      diameter_min.innerHTML = `<span><img src="/images/fleche.png"/></span> His minimum diameter : ${asteroides.near_earth_objects[dateToString][0].estimated_diameter.kilometers.estimated_diameter_min} Km`;
      const diameter_max = document.querySelector("#diametre_max");
      diameter_max.innerHTML = `<span><img src="/images/fleche.png"/></span> His maximum diameter : ${asteroides.near_earth_objects[dateToString][0].estimated_diameter.kilometers.estimated_diameter_max} Km`;
      const hazardous = document.querySelector("#hazardous");
      hazardous.innerHTML = `<span><img src="/images/fleche.png"/></span> Was he hazardous ? ${
        dictionnaire[
          asteroides.near_earth_objects[dateToString][0]
            .is_potentially_hazardous_asteroid
        ]
      }`;
      const sentry = document.querySelector("#sentry");
      sentry.innerHTML = `<span><img src="/images/fleche.png"/></span> Was he sentry ? ${
        dictionnaire[
          asteroides.near_earth_objects[dateToString][0].is_sentry_object
        ]
      }`;
      const distance = document.querySelector("#distance");
      distance.innerHTML = `<span><img src="/images/fleche.png"/></span> His miss distance : ${asteroides.near_earth_objects[dateToString][0].close_approach_data[0].miss_distance.kilometers} Km`;
      const vitesse = document.querySelector("#vitesse");
      vitesse.innerHTML = `<span><img src="/images/fleche.png"/></span> His velocity : ${asteroides.near_earth_objects[dateToString][0].close_approach_data[0].relative_velocity.kilometers_per_hour} Km/hour`;
    });
}

// Créer les éléments HTML
function addTitreAPOD() {
  let newTitre = document.createElement("h2");
  let newContent = document.createTextNode("Picture of the Day");
  newTitre.appendChild(newContent);
  console.log(newTitre);
  let currentDiv = document.getElementById("input");
  currentDiv.after(newTitre);
}

function addTitreNEO() {
  let newTitre = document.createElement("h2");
  let newContent = document.createTextNode("Asteroid of the Day");
  newTitre.appendChild(newContent);
  console.log(newTitre);
  let currentDiv = document.getElementById("APOD");
  currentDiv.after(newTitre);
}

function addSousTitreNEO() {
  let newTitre = document.createElement("h4");
  let newContent = document.createTextNode(
    "Click on earth to discover the asteroid of the day!"
  );
  newTitre.appendChild(newContent);
  console.log(newTitre);
  let currentDiv = document.getElementById("APOD");
  currentDiv.after(newTitre);
}

// Faire apparaître les blocs d'infos seulement après avoir saisi la date
function hideAsteroidDescription() {
  let divDescription = document.getElementById("description");
  divDescription.style.setProperty("display", "block");
  let divEarth = document.getElementById("earth");
  divEarth.style.setProperty("margin-left", "auto");
}

function hidePictureDescription() {
  let pictureDescription = document.getElementById("content-picture");
  pictureDescription.style.setProperty("display", "block");
}

//Faire apparaître les infos de l'astéroïde au survol

/*Le Nom*/
let nom = document.getElementById("nom");
let infoNom = document.getElementById("infoNom");

nom.addEventListener("mouseover", () => {
  infoNom.style.display = "block";
});
nom.addEventListener("mouseout", () => {
  infoNom.style.display = "none";
});

/*Hazardous*/
let hazardous = document.getElementById("hazardous");
let infoHazardous = document.getElementById("infoHazardous");

hazardous.addEventListener("mouseover", () => {
  infoHazardous.style.display = "block";
});
hazardous.addEventListener("mouseout", () => {
  infoHazardous.style.display = "none";
});

/*Sentry*/
let sentry = document.getElementById("sentry");
let infoSentry = document.getElementById("InfoSentry");

sentry.addEventListener("mouseover", () => {
  infoSentry.style.display = "block";
});
sentry.addEventListener("mouseout", () => {
  infoSentry.style.display = "none";
});

/*Miss distance*/
let distance = document.getElementById("distance");
let infoDistance = document.getElementById("infoDistance");

distance.addEventListener("mouseover", () => {
  infoDistance.style.display = "block";
});
distance.addEventListener("mouseout", () => {
  infoDistance.style.display = "none";
});

/*Minimum diameter*/
let diametre_min = document.getElementById("diametre_min");
let InfoDiametreMin = document.getElementById("InfoDiametreMin");

diametre_min.addEventListener("mouseover", () => {
  InfoDiametreMin.style.display = "block";
});
diametre_min.addEventListener("mouseout", () => {
  InfoDiametreMin.style.display = "none";
});

/*Maximum diameter*/
let diametre_max = document.getElementById("diametre_max");
let InfoDiametreMax = document.getElementById("InfoDiametreMax");

diametre_max.addEventListener("mouseover", () => {
  InfoDiametreMax.style.display = "block";
});
diametre_max.addEventListener("mouseout", () => {
  InfoDiametreMax.style.display = "none";
});

/*Velocity*/
let vitesse = document.getElementById("vitesse");
let InfoVitesse = document.getElementById("InfoVitesse");

vitesse.addEventListener("mouseover", () => {
  InfoVitesse.style.display = "block";
});
vitesse.addEventListener("mouseout", () => {
  InfoVitesse.style.display = "none";
});
