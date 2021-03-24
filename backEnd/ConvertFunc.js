let csvToJson = require("convert-csv-to-json");

let fileInputName = "data4.csv";
let fileOutputName = "data4.json";

// let json = csvToJson.getJsonFromCsv("data4.csv");
// for (let i = 0; i < json.length; i++) {
//   console.log(json[i]);
// }
csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);

const obj = {
  '"Price","Model","Location","Posted"':
    '"Rs 72,000","Apple Iphone X 64GB PTA Apprpved","BMCHS, KARACHI","TODAY"',
};

Object.keys(obj).map((item) => {
  const keyArray = item.split(",");
  console.log(keyArray);
  const valArray = obj[item].split(",");
  console.log(valArray[0]);
  console.log(keyArray.map((key) => valArray[keyArray.indexOf(key)]));
});
