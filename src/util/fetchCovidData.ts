import { storeData } from './localDataHelper';
import filterObject from './filterObj';
import findAvgLongLat from './findAvgLongLat';
import findStateCode from './findStateCode';
import validateZip from './validateZip';

async function fetchCovidByState(search: string) {
  const STATE_CODE = findStateCode(search);
  const baseUrl = `https://api.covidtracking.com/v1/states/${STATE_CODE}/current.json`;
  const response = await fetch(baseUrl);
  const body = await response.json();
  return body;
}

async function fetchCovidDataByZip(zipCode: string) {
  const zipUrl = `http://api.zippopotam.us/us/${zipCode}`;
  const response = await fetch(zipUrl);
  const body = await response.json();
  //temp solution covert zip to state search
  const state = body.places[0]["state abbreviation"];

  const baseUrl = `https://api.covidtracking.com/v1/states/${state}/current.json`;
  const response2 = await fetch(baseUrl);
  const body2 = await response2.json();
  return body2;
}

async function fetchCovidData(search: string) {
  let data = {};
  console.log('what is search', search)
  try {
    data = validateZip(search)
      ? await fetchCovidDataByZip(search)
      : await fetchCovidByState(search);
  } catch (error) {
    console.log('failed to fetch data', error);
  }
  console.log('checking data', data)
  const newData = await filterObject(data);
  const avgLongAndLat = await findAvgLongLat(newData.state);

  return {
    ...newData,
    ...avgLongAndLat
  };
}

export default fetchCovidData;
