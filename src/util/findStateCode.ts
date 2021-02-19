import StateJSON from "../reserve/states/StateToAbb.json";

export default function findStateCode(search: string) {
  console.log(StateJSON)
  const STATE_CODE: { [key: string]: string } = StateJSON;
  return STATE_CODE[search];
}
