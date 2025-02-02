console.log("Koden är länkad!");

let latestQuery = "";

// DOM referenser
const formEl = document.getElementById("search-form");
const inputEl = document.getElementById("searchInput");
const universitiesContainerEl = document.getElementById("universities-container");
const imageCountEl = document.getElementById("results-count");
const nextPageBtn = document.getElementById("next-page-button");
const prevPageBtn = document.getElementById("prev-page-button");
const pageCountEl = document.getElementById("page-count");

// Funktion för att hämta universitet baserat på land
async function fetchUniversities(query, count) {
    const endpoint = `http://universities.hipolabs.com/search?country=${query}`;
    const flagEndpoint = `https://restcountries.com/v3.1/name/${query}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        console.log("Hämtade universitet:", data);
        console.log(data.length);
        // Begränsa antalet resultat enligt användarens val
        const limitedResults = data.slice(0, count);

        // Spara i localStorage
        localStorage.setItem("all_universities", JSON.stringify(limitedResults));

        // Rendera på sidan
        renderUniversitiesToUI(limitedResults);

         // Hämta flagga
         const flagResponse = await fetch(flagEndpoint);
         if (!flagResponse.ok) throw new Error(`Error fetching flag: ${flagResponse.status}`);
         
         const flagData = await flagResponse.json();
         const flagUrl = flagData[0]?.flags?.svg || '';  // Hämta flagg-URL
          
         //Lösa Problem 1 : Behöver vissa flagg image(.svg) och byta flagg efter söka annan länd(country) ??
 
         // Sätt bakgrundsbilden för landet
         setCountryBackground(flagUrl);    // ??  Det finns lite problem när jag söka annan länd funkar bra att byta flagg men gammla lokal storage finns forfatarande i web browser
 
    } catch (error) {
        console.error("Fel vid hämtning av universitet:", error);
    }
}

// Funktion för att sätta bakgrundsbild för landet
function setCountryBackground(flagUrl) {
    const body = document.body;
    if (flagUrl) {
        body.style.backgroundImage = `url(${flagUrl})`;
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';
        body.style.backgroundAttachment = 'fixed';
        body.style.transition = 'background-image 0.5s ease-in-out';
    }
}

// Funktion för att rendera universitet på sidan
function renderUniversitiesToUI(universities) {
    universitiesContainerEl.innerHTML = "";

    if (!universities || universities.length === 0) {
        universitiesContainerEl.innerHTML = "<p>Inga universitet hittades.</p>";
        return;
    }

    const universityCardsAsString = universities.map((u) => createUniversityCard(u)).join("");
    universitiesContainerEl.innerHTML = universityCardsAsString;
}

// Funktion för att skapa ett universitet-kort
function createUniversityCard(university) {
    return `
    <article id="${university.name}">
        <figure style="backgroundImage = url(${flagUrl}); border-radius: 15px;">
            <label for="${university.country}" style="margin-left: 2rem; display: inline-block;">${university.country} </label>
            <input class="like-checkbox" id="${university.name}" type="checkbox">
     
        <h2 style=" font-wight: bold; color: red; height: 6rem; ">${university.name}</h2>
        <a href="${university.web_pages ? university.web_pages[0] : '#'}" target="_blank" style= "text-align:center ;height: 6rem; width: 6rem; background-color: white; border-radius: 15px;">
            Besök universitetets webbplats
        </a>   </figure>
    </article>
    `;
}

// Eventlyssnare på sökformuläret
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Sökning startad!");

    const query = inputEl.value.trim();
    const count = parseInt(imageCountEl.value, 10) || 10;

    if (query) {
        fetchUniversities(query, count);
        latestQuery = query;
        inputEl.value = "";
    }
});

// Funktion för att ladda sparade universitet från localStorage vid sidladdning
function checkUniversities() {
    const allUniversities = JSON.parse(localStorage.getItem("all_universities")) || [];
   
    if (allUniversities.length > 0) {
        renderUniversitiesToUI(allUniversities);
    } else {
        console.log("Inga universitet sparade i LocalStorage ännu.");
    }
}

// Kör vid sidladdning
checkUniversities();
