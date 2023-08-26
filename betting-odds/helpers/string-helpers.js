export function numberToString(value){
    if(!value)
        return;

    let str = String(value);
    if(!str.includes('-'))
        str = '+' + str;

    return str;
}

export function sanitizeHTML(value) {
    if(!value)
        return;

    const regex = /(<([^>]+)>)/gi;
    const newString = value.replace("<br/>", " ").replace("<br>", " ").replace(regex, "");

    return newString;
}