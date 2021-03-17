type objectType = { [key: string]: string }

function filterObject(obj: objectType, master: objectType) {
    let newObject = {}
    for (const [key, value] of Object.entries(master)) {
        if (value === 'true') {
            newObject = { ...newObject, [key]: obj[key] }
        }
    }
    return newObject
}

export default filterObject