export {fetchBreeds, fetchCatByBreed};
import {loading, error, div} from "./index.js";
import axios from "axios";

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
};



function fetchCatByBreed(breedId){
    const response = localStorage.getItem("breedsObject");
    const breedObj = JSON.parse(response);
    const value1 = breedObj[breedId][1];
    const value2 = breedObj[breedId][2];
    axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedObj[breedId][0]}`).then((response)=>{

    //Create img-------------------------------------------
    const img = response.data[0].url
    const imgElement = document.createElement("img");
    imgElement.style.width = "500px";
    imgElement.style.height = "500px";
    imgElement.src = img;

    //Create text-------------------------------------------
    const text = document.createElement("p");
    text.innerHTML = `<h1>${breedId}</h1><br>${value1}<br><b>Temperament : </b>${value2}`;

    //------------------------------------------------------
    div.removeAttribute("hidden");
    loading.setAttribute("hidden","");
    div.innerHTML = "";
    div.append(imgElement);
    div.append(text);

    }).catch(()=>{
        loading.setAttribute("hidden","");
        error.removeAttribute("hidden");
    });
};