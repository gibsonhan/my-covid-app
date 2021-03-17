type objectType = {
    [key: string]: any | undefined | null
}
function isObjectEmpty(object: objectType) {
    //if Object contains key: value pair return false
    if (!object) return true
    for (const [key, value] of Object.entries(object)) {
        return false
    }
    return true
}

export default isObjectEmpty