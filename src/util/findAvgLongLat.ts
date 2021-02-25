import geoData from '../reserve/states/avgLongLatStates.json';
import stateAbbToFull from '../util/stateAbbToFull';

//stateABB = state abbreviation
async function findAvgLongLat(stateAbb: string) {
    const state = await stateAbbToFull(stateAbb);
    const avgLongAndLat = geoData.filter((ele) => ele.state === state)[0];
    return avgLongAndLat;
}

export default findAvgLongLat;
