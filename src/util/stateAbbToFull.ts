import Abbreviation from '../reserve/states/AbbToState.json';

export default async function stateAbbToFull(state: string) {
    const STATE_FULL_NAME: { [key: string]: string } = Abbreviation;
    return STATE_FULL_NAME[state];
}
