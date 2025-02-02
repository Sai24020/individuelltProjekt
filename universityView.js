
let universitiesFormLS = [];
let currentUniversity = {};

function onPageLoad() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("u");
    console.log(u);

    universitiesFormLS = JSON.parse(localStorage.getItem("all_universities"));
    currentUniversity = universitiesFormLS.find((element) => element.id === id);
    renderUniversitiesToUI();
};
onPageLoad();

function renderUniversityToUI() {
    const universityImgEl = document.getElementById("university-image");
    universityImgEl.setAttribute("src", currentUniversity.image);
    universityImgEl.setAttribute("alt", `University cover of (${currentUniversity.name})`)
};

const seenCheckboxEl = document.getElementById("seen");
seenCheckboxEl.addEventListener("click", (e) => {
    handelSeenClicked(e);
   // console.log(e);
   
});

function handelSeenClicked(e) {

    currentUniversity.seen = e.target.checked;
    console.log(currentUniversity);

    const index = universitiesFormLS.findIndex((u) => u.id === currentUniversity.id);
    //console.log(index);
    let universitiesFormLS =  universitiesFormLS.splice(index, currentUniversity);
 //   console.log(universitiesFormLs);
      localStorage.setItem("all_universities", JSON.stringify(universitiesFormLS));

      //hantera sett-listan(seen_universitet) i LS
     // kika om seen_universitet ens finns

    const seenUniversitetFormLS = JSON.parse(localStorage.getItem("seen") || "[]");

      if (currentUniversity.seen) {
        //nu lägga in university i seen_universitet
        seenUniversitetFormLS.push(currentUniversity);
        //console.log(seenUniversitetFormLs);
        console.log(seenUniversitetFormLS);

        localStorage.setItem("seen_universitet", JSON.stringify("seenUniversitetFormLS")); 
    } else {
        const index = seenUniversitetFormLS.findIndex((u) => u.id === currentUniversity.id);
        seenUniversitetFormLS.splice(index, 1);
        console.log(seenUniversitetFormLS);

        localStorage.setItem("seen_universitet", JSON.stringify(seenUniversitetFormLS));
    }
};