import axios, { formToJSON } from "axios";

export const fetchCity = async (city) => {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=48cc8599b7d2421f913134839240903&q=${city}&aqi=no`)

    return response;
}
