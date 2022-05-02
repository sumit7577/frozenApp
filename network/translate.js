import axios from "axios";
import { GOOGLE_URI,GOOGLE_KEY } from "@env";

const translator = async (text, from, source) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", text);
    encodedParams.append("target", from);
    encodedParams.append("source", source);
    const options = {
        method: 'POST',
        url: GOOGLE_URI,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
            'X-RapidAPI-Key': GOOGLE_KEY
        },
        data: encodedParams
    };

    const response = await axios.request(options);
    return response;
}

export default translator;