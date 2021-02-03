import StateJSON from "../reserve/states/AbbtoStates.json";

export default function findStateCode(search: string) {
  const STATE_CODE: { [key: string]: string } = StateJSON;
  return STATE_CODE[search];
}
