
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

/* convert into number all indexes in the array to ensure number type */
export const convertNumbers = (value) =>{
  if (typeof variable === 'string') {
    let arr = value.map(num => parseInt(num))
    return arr
  }else{
    return parseInt(value)
  }
}

/* check if the radio value is not matched on the one of the list, return 'others' if not match or else the matching value */
export const isOtherValueDefinedRadio = (value,items) => {
  let countMatchedTimes = 0;
  let matchedValue = '';
  for(let i=0; i<items.length; i++){
    if(value === items[i]){
      countMatchedTimes++;
      matchedValue = items[i];
    }
  }
  if(countMatchedTimes > 0){
    return matchedValue;
  }else{
    return 'others'
  }
}

/* return the value that is not matched on the items, and return it to the Other named property, this is for radio */
export const extractUnmatchedValueRadio = (value,items) => {
  if(value){
    let countMatches = 0;
    items.forEach((item) => {
      if(value == item){
        countMatches++
      }
    })
    if(countMatches == 0){
      return value
    }else{
      return ''
    }
  }else{
    return ''
  }
}

// not used yet
/* return the value that is not matched on the items, this is for checkboxes */
export const extractUnmatchedValueCheck = (values,items) => {
  if(values){
    let unmatchedValue = [''];
    values.forEach((value) => {
        let countMatches = 0;
        items.forEach((item) => {
          if(value == item){
            countMatches++
          }
        })
        if(countMatches == 0){
          unmatchedValue.push(value)
        }
    });
    console.log(unmatchedValue)
    return unmatchedValue[0]    
  }else{
    return ''
  }
}
