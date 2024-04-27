import axios from "axios";
import SlimSelect from 'slim-select'


axios.defaults.headers.common["x-api-key"] = "live_DPgtRuS55twAs44wocZ26USyYsmbsoOkYMWeCrX1RG3iN78x3sBDWXARDsfs3qBx";

const breedsName = document.querySelector(".breed-select");
const loading = document.querySelector(".loader");
const error = document.querySelector(".error");
const div = document.querySelector(".cat-info");
 loading.setAttribute("hidden", "") ;
 error.setAttribute("hidden","");




function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds").then((response) => {
        const breeds = {}; 
        response.data.forEach((element) => {
            breeds[element.name] = [element.id,element.description,element.temperament]; 
        });
        return breeds;
    }).catch(()=>{
        loading.setAttribute("hidden","");
        error.removeAttribute("hidden");
    });
}
fetchBreeds().then(breeds => {
    const breedsObj = breeds;
    dodawanieOpcji(breedsObj);
    localStorage.setItem("breedsObject", JSON.stringify(breedsObj));
});



function dodawanieOpcji(breeds) {
    const keys = Object.keys(breeds);
    keys.forEach(element => {
        const option = document.createElement("option");
        option.textContent = element;
        breedsName.append(option);
    });
};

function show(value){
    const response = localStorage.getItem("breedsObject");
    const zmienna = JSON.parse(response);
    const zmienna2 = zmienna[value][1];
    const zmienna3 = zmienna[value][2];
    axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${zmienna[value][0]}`).then((response)=>{
        const img = response.data[0].url
        const imgElement = document.createElement("img");
        const text = document.createElement("p");
        text.innerHTML = `<h1>${value}</h1><br>${zmienna2}<br><b>Temperament : </b>${zmienna3}`;
        imgElement.style.width = "500px";
        imgElement.style.height = "500px";
        imgElement.src = img;
        div.removeAttribute("hidden");
        loading.setAttribute("hidden","");
        div.innerHTML = "";
        div.append(imgElement);
        div.append(text);
    }).catch(()=>{
        loading.setAttribute("hidden","");
        error.removeAttribute("hidden");
    });
}
breedsName.addEventListener("change", (evenet)=>{
    error.setAttribute("hidden","");
   div.setAttribute("hidden","");
   loading.removeAttribute("hidden","");
    const wartosc = evenet.target.value;
    show(wartosc);
    
})
