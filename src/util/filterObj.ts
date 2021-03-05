//TODO need to go through typescript tuotrial to learn how to write generics1
//https://www.typescriptlang.org/docs/handbook/generics.html

export interface filterInterface {
    state: string;
    date: number;
    lastUpdateEt: string;
    dataQualityGrade: string; //Date and time in Eastern time the state or territory last updated the data.
    positive: number;
    hospitalizedIncrease: number;
    hospitalizedCurrently: number;
    onVentilatorCurrently: number;
    inIcuCurrently: number;
    death: number;
    deathIncrease: number;
    positiveIncrease: number;
}

//LOOK IT UP?
export function filterOutObj(list, obj) {
    let newObj = {}
    //iterate through object
    for (const [key, value] of Object.entries(obj)) {
        //if key exist in filter list, exclude.
        if (!list[key]) {
            newObj = { ...newObj, [key]: value }
        }
    }
    return newObj
}

export function extractObject(list, obj) {
    let newObj = {}
    //iterate through object
    for (const [key, value] of Object.entries(obj)) {
        //if key exist in filter list, exclude.
        if (list[key]) {
            newObj = { ...newObj, [key]: value }
        }
    }
    return newObj
}

//TODO need to generalize this function
export default function filterObject(data: {}, filterList: {}): object {
    //TODO need to fix this typescript
    let newData = {}

    for (const [key, value] of Object.entries(data)) {
        //if key is NOT in filter List add key:value pair into new object
        if (!filterList[key]) {
            newData = { ...newData, [key]: value }
        }
    }

    return newData;
}
