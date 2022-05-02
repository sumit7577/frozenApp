import { axios } from "./products";


const getCountry = async()=>{
    const response = await axios.get("https://api.first.org/data/v1/countries");
    return response;
}

export {getCountry};