import StateJSON from '../reserve/states/StateToAbb.json';

export default function findStateCode(search: string) {
    const STATE_CODE: { [key: string]: string } = StateJSON;
    return STATE_CODE[search];
}
