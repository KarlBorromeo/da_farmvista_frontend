/* concatenate the value of other into the index of list that has 'other(s)' */
export const concatOtherValueToList = (list, other) => {
  let listCopy = [...list]
  if (!!other) {
    for (let i = 0; i < listCopy.length; i++) {
      if (listCopy[i] == 'others' || listCopy[i] == 'other') {
        if (!other) {
          listCopy[i] = 'others - ' + 'empty'
        } else {
          listCopy[i] = 'others - ' + other
        }
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

/* convert into number all indexes in the array or string to ensure number type */
export const convertNumbers = (value) => {
  if (Array.isArray(value)) {
    let arr = [...value]
    let newArr
    newArr = arr.map((num) => parseInt(num))
    return newArr
  } else {
    return parseInt(value)
  }
}

// FOR RADIO AND SELECT
/* check if the radio value is not matched on the one of the list, return 'others' if not match else return the matched value, this is for radio or select*/
export const isOtherValueDefinedRadio = (value, items) => {
  console.log(value, items)
  let countMatchedTimes = 0
  let matchedValue = ''
  for (let i = 0; i < items.length; i++) {
    if (value === items[i]) {
      countMatchedTimes++
      matchedValue = items[i]
    }
  }
  if (countMatchedTimes > 0) {
    return matchedValue
  } else {
    return 'others'
  }
}
/* return the value that is not matched on the items or else return '', this is for radio or select*/
export const extractUnmatchedValueRadio = (value, items) => {
  if (value) {
    let countMatches = 0
    items.forEach((item) => {
      if (value == item) {
        countMatches++
      }
    })
    if (countMatches == 0) {
      return value
    } else {
      return ''
    }
  } else {
    return ''
  }
}

// FOR CHECKBOXES
/* if Array => finds the index that is not one of the items. if no matches return the index value else return '' */
/* if !Array test if the value matches one of the items, if no matches return the value else return '' */
/* this is for checkboxes other property */
export const extractUnmatchedValueCheck = (value, items) => {
  let extracted = ''
  if (Array.isArray(value)) {
    value.forEach((val) => {
      let countMatches = 0
      items.forEach((item) => {
        if (val == item) {
          countMatches++
        }
      })
      if (countMatches == 0) {
        extracted += val + ', '
      }
    })
  } else {
    /* this is incase we are passing not array value */
    return extractUnmatchedValueRadio(value, items)
  }
  if (extracted.endsWith(', ')) {
    extracted = extracted.slice(0, -2)
  }
  return extracted
}
/* look for the specific index that is not matched on the item. return a list, for checkboxes property */
export const isOtherValueTickedCheckbox = (values, items) => {
  if (values) {
    let arr = [...values]
    arr.forEach((val, i) => {
      let countMatches = 0
      items.forEach((item) => {
        if (val == item) {
          countMatches++
        }
      })
      if (countMatches == 0) {
        arr[i] = 'others'
      }
    })
    return arr
  } else {
    return []
  }
}
