export default function validateZip(search: string) {
    let regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;
    return regexp.test(search) ? true : false;
}
