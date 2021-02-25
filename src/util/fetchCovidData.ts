import { storeData } from './localDataHelper';
import filterObject from './filterObj';
import findAvgLongLat from './findAvgLongLat';
import findStateCode from './findStateCode';
import validateZip from './validateZip';

async function fetchCovidByState(search: string) {
    const STATE_CODE = findStateCode(search);
    const baseUrl = `https://api.covidtracking.com/v1/states/${STATE_CODE}/current.json`;
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
}

async function fetchCovidDataByZip(zipCode: string) {
    const zipUrl = `http://api.zippopotam.us/us/${zipCode}`;
    const response = await fetch(zipUrl);
    const body = await response.json();
    //temp solution covert zip to state search
    const state = body.places[0]['state abbreviation'];
    const baseUrl = `https://api.covidtracking.com/v1/states/${state}/current.json`;
    const response2 = await fetch(baseUrl);
    const data = await response2.json();
    return data;
}

async function fetchCovidData(search: string) {
    const response = validateZip(search)
        ? await fetchCovidDataByZip(search)
        : await fetchCovidByState(search);

    const newData = await filterObject(response);
    const avgLongAndLat = await findAvgLongLat(newData.state);

    if (response.error) {
        return { ...response };
    } else {
        return {
            ...newData,
            ...avgLongAndLat
        };
    }
}

export default fetchCovidData;
