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
        state,
        date,
        lastUpdateEt,
        dataQualityGrade,
        positive,
        hospitalizedIncrease,
        hospitalizedCurrently,
        onVentilatorCurrently,
        inIcuCurrently,
        death,
        deathIncrease,
        positiveIncrease
    };

    return newData;
}
