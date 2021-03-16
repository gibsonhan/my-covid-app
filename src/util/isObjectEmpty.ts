function isObjectEmpty(object: { [key: string]: any }) {
    //if Object contains key: value pair return false
    for (const [key, value] of Object.entries(object)) {
        return false
    }
    return true
}

export default isObjectEmpty