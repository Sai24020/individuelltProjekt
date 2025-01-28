
console.log("koden är länkad");
const BASE_URL = "https://raw.githubusercontent.com/Hipo/university-domains-list/refs/heads/master/world_universities_and_domains.json";

// få data från API:et
async function fetchUniversities() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        const data = await response.json();

        // ändra i varje univerciteitsobjekt, så den får review och rating
        // loopa över listan
        data.forEach(university => {
            university.alpha_two_code = "US";
            university.state_province = null;
            university.country = "United States"
            university.domains = [];
        });
        // spara svaret från API till LS
        localStorage.setItem("world_universities_and_domains", JSON.stringify(data));
    }
    catch (error) {
        console.error(error);
    }
};

function checkUniversities() {
    // kolla om det redan finns universities i LS
    const all_universities = JSON.parse(localStorage.getItem("world_universities_and_domains"));
    if (all_universities) {
        // i så fall: rendera från LS
        renderUniversitiesToUI(all_universities);
    } else {
        // annars hämta data från API
        fetchUniversities();
        const updated_all_universities = JSON.parse(localStorage.getItem("all_universities"));
        renderUniversitiesToUI(updated_all_universities);
    }
};
checkUniversities();

// rendera från LS till mitt UI
function renderUniversitiesToUI(universities) {
    console.log(universities);
    const universitiesContainerEl = document.getElementById('movies-container');
    universities.forEach((university) => {
        const universityContainerEl = document.createElement('article');
        // skapa element för bilden
        const universityImgEl = document.createElement('figure');
        universityImgEl.style.color = `black`;   //.backgroundColor = `url(${movie})`;
        const universityNameEl = document.createElement('p');
        universityNameEl.innerHTML = `<h2 class="rt-score">${university.name}</h2>`;
        universityImgEl.appendChild(universityNameEl);

        // lägg till figure på universityContainerEl
        universityContainerEl.appendChild(universityImgEl);
        // lägg till titel och release date på universitykortet
        const universityCountryEl = document.createElement('h3');
        universityCountryEl.innerText = university.country;
        universityContainerEl.appendChild(universityCountryEl);
        const releaseDateEl = document.createElement('p');
        releaseDateEl.innerHTML = university.web_pages;
        universityContainerEl.appendChild(releaseDateEl);

        // till sist lägger vi till nya elementet i vår HTML
        universitiesContainerEl.appendChild(universityContainerEl);
    });
};