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
export default function filterObject(data: object): filterInterface {
    //TODO need to fix this typescript
    const {
        date,
        lastUpdateEt,
        state,
        dataQualityGrade,
        positiveIncrease,
        positive,
        hospitalizedIncrease,
        hospitalizedCurrently,
        onVentilatorCurrently,
        inIcuCurrently,
        death,
        deathIncrease
    }: filterInterface = data;

    const newData = {
        dataQualityGrade,
        death,
        deathIncrease,
        positive,
        hospitalizedIncrease,
        hospitalizedCurrently,
        onVentilatorCurrently,
        inIcuCurrently,
        state,
        positiveIncrease,
        date,
        lastUpdateEt,

    };

    return newData;
}
