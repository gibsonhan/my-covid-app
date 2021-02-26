//TODO write correct typescript function for this
/*
    function objectToArray<T>(object): Array<T> {

}
*/

export function convertToArray<T>(obj: T) {
    type listType = {
        key: string,
        title: string,
        value: string
    }
    let list: Array<listType> = []

    for (const [key, value] of Object.entries(obj)) {
        let newObj = { key: list.length + `${key}`, title: `${key}`, value: `${value}` }
        list = [...list, newObj]
    }

    return list
}