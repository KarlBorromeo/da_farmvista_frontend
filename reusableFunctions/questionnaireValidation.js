

/* concatenate the value of other into the index of list that has 'other' */
export const concatOtherValueToList = (list, other) => {
  let listCopy = list.splice()
  if (!!other) {
    for (let i = 0; i < listCopy.length; i++) {
      if (listCopy[i] == 'others') {
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
  const arr = []
  for (let i = 0; i < numberItems; i++) {
    let other = ''
    if (otherList[i]) {
      other = ' ' + otherList[i]
    }
    arr.push(originalList[i] + other)
  }
  return arr
}

/* generate object either empty values if passed parameter is false else not */
export const generateObject = (data,bool) => {
  console.log(bool)
  console.log(data);
  const copyData = {...data};
  const keys = Object.keys(copyData);
  
  // if(!bool){
    // keys.forEach( key => {
    //   console.log('type:',typeof(copyData[key]))
    // })    
  // }

}
