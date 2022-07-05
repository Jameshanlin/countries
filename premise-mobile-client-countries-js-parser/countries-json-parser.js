const countryJsonData = require('../dist/countries.json');
const fs = require('fs');

const formattedData = countryJsonData.map((country) => {
  let formattedCountryObject = {};
  //Country Code
  formattedCountryObject.countryCode = country.cca2;

  // Country English Display Name
  formattedCountryObject.englishDisplayName = country.name.common;

  // Country Native Display Name
  formattedCountryObject.nativeDisplayName = getNativeDisplayName(country);

  // Country Flag
  formattedCountryObject.flag = country.flag;

  // Country Dialing Code
  formattedCountryObject.internationalDialingCodePrefix = getInternationalDialingCodePrefix(country);

  return formattedCountryObject;
});

function getNativeDisplayName(country) {
  let firstNativeNameObject = country.name.native[Object.keys(country.name.native)[0]];
  if (firstNativeNameObject instanceof Object && firstNativeNameObject.hasOwnProperty('common')) {
    return firstNativeNameObject.common;
  } else {
    return country.name.common;
  }
}

function getInternationalDialingCodePrefix(country) {
  if (country.idd.suffixes.length > 3) {
    return country.idd.root;
  } else {
    return `${country.idd.root}${country.idd.suffixes[0]}`;
  }
}

// write JSON string to a file
fs.writeFile('./formatted-countries-data.json', JSON.stringify(formattedData), (err) => {
  if (err) {
    throw err;
  }
  console.log(`JSON data is saved with ${formattedData.length} countries`);
});
