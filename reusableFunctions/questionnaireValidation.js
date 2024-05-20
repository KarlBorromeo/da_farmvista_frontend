/* concatenate the value of other into the index of list that has 'other' */
export const concatOtherValueToList = (list, other) => {
  let listCopy = [...list]
  if (!!other) {
    for (let i = 0; i < listCopy.length; i++) {
      if (listCopy[i] == 'others' || listCopy[i] == 'other') {
        listCopy[i] = other
        break
      }
    }
  }
  return listCopy
}

/* concatenate two value holders for field that has others (ex: variable, variableOther)*/
export const concatinateOtherValueToString = (original, other) => {
  let text = original
  if (!!other) {
    text += other
  }
  return text
}

/* concatenate each indexes and return new array (ex: tenure, tenureOthers)*/
export const concatinateEachIndexes = (
  originalList,
  otherList,
  numberItems
) => {
  const arr = [...originalList]
  for (let i = 0; i < numberItems; i++) {
    if (otherList[i]) {
      arr[i] = arr[i] + ' ' + otherList[i]
    }
  }
  return arr
}
