import axios from "axios";
import {fetchBreeds, fetchCatByBreed} from "./cat-api";
export{loading, error, div};


axios.defaults.headers.common["x-api-key"] = "live_DPgtRuS55twAs44wocZ26USyYsmbsoOkYMWeCrX1RG3iN78x3sBDWXARDsfs3qBx";

const breedsName = document.querySelector(".breed-select");
const loading = document.querySelector(".loader");
const error = document.querySelector(".error");
const div = document.querySelector(".cat-info");
 loading.setAttribute("hidden", "") ;
 error.setAttribute("hidden","");



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


breedsName.addEventListener("change", (event)=>{
    error.setAttribute("hidden","");
   div.setAttribute("hidden","");
   loading.removeAttribute("hidden","");
    const value = event.target.value;
    fetchCatByBreed(value);
});
