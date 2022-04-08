const check = require('check-types');
const validator = require("email-validator");
/**
 * Check if date, return null otherwise
 * @param {string} date - Date
 * @param {boolean} isRequired - Returns null if required otherwise "". Default true
 */
exports.fDate = (date, isRequired) => {
  if (!date)
    return null
  date = new Date(date)
  if (check.date(date))
    return date
  else if (isRequired === false)
    return ''
  else
    return null
}


/**
 * Check if number, return null otherwise
 * @param {string} number - Number
 */
exports.fNumber = (number) => {
  if (!isNaN(parseFloat(number)))
    return parseFloat(number)
  else
    return null
}

/**
 * Check if mail is valid, return null otherwise
 * @param {String} mail - Number
 */
exports.checkMail = (mail) => {
  if (validator.validate(mail))
    return mail
  else
    return null
}

/**
 * Capitalize each word and remove extra spacing between strings
 * @param {string} string - Possibly Order No
 * @param {(null|'onlyFirstWord')} option - `onlyFirstWord` for capitalize only first word
 */
exports.fTitleCase = (str, option) => {
  if (!str)
    return null
  str = str.toString();
  str = str.replace(/\s+/g, " "); //Remove extra spacing between object
  var splitStr = str.toLocaleLowerCase('tr').split(' ');//.replace(/[^\w\s]/g, '').split(' ');

  if (option === "onlyFirstWord")
    splitStr[0] = letterToUpperCase(splitStr[0].charAt(0)) + splitStr[0].substring(1);
  else {
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = letterToUpperCase(splitStr[i].charAt(0)) + splitStr[i].substring(1);
    }
  }
  return splitStr.join(' ');
}

function letterToUpperCase(letter) {
  if (letter === 'i')
    return "İ"
  else if (letter === 'ç')
    return "Ç"
  else if (letter === 'ö')
    return "Ö"
  else if (letter === 'ş')
    return "Ş"
  else if (letter === 'ü')
    return "Ü"
  else if (letter === 'ı')
    return "I"
  else if (letter === 'ğ')
    return "Ğ"
  else
    return letter.toUpperCase()
}
/**
 * Replace turkish chars with english ones
 * @param {string} string - Turkish chars string
 */
exports.trToEn = (str) => {
  return str.replace(/Ğ/gim, "g")
    .replace(/Ü/gim, "u")
    .replace(/Ş/gim, "s")
    .replace(/I/gim, "i")
    .replace(/İ/gim, "i")
    .replace(/Ö/gim, "o")
    .replace(/Ç/gim, "c")
    .replace(/ğ/gim, "g")
    .replace(/ü/gim, "u")
    .replace(/ş/gim, "s")
    .replace(/ı/gim, "i")
    .replace(/ö/gim, "o")
    .replace(/ç/gim, "c");
}