/* concatenate the value of other into the index of list that has 'other' */
export const concatOtherValueToList = (list, other) => {
    if (!!other) {
        for (let i = 0; i < list.length; i++) {
        if (list[i] == 'others') {
            list[i] += ' ' + other
            break
        }
        }
    }
    return list
}

/* concatenate two value holders for field that has others (ex: variable, variableOther)*/
export const concatinateOtherValueToString = (original, other) => {
    let text = original
    if (!!other) {
      text += ' ' + other
    }
    return text
}