import { storeData } from "../../store/localDataHelper";
import filterObject from "../filterObj";
import findStateCode from "../findStateCode";
import validateZip from "../validateZip";

async function fetchCovidByState(search: string) {
  const STATE_CODE = findStateCode(search);
  const baseUrl = `https://api.covidtracking.com/v1/states/${STATE_CODE}/current.json`;
  let response = await fetch(baseUrl);
  let body = await response.json();
  return body;
}

async function fetchCovidDataByZip(zipCode: string) {
  const zipUrl = `http://api.zippopotam.us/us/${zipCode}`;
  const response = await fetch(zipUrl);
  let body = await response.json();
  //temp solution covert zip to state search
  let state = body.places[0]["state abbreviation"];

  const baseUrl = `https://api.covidtracking.com/v1/states/${state}/current.json`;
  let response2 = await fetch(baseUrl);
  let body2 = await response2.json();
  return body2;
}

async function fetchCovidData(search: string) {
  let data: object = {};
  try {
    data = validateZip(search)
      ? await fetchCovidDataByZip(search)
      : await fetchCovidByState(search);
  } catch (error) { }

  const newData = await filterObject(data);
  await storeData('covid search', newData);
}

export { fetchCovidData };
