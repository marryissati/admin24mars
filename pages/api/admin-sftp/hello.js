// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction


// export default (req, res) => {
//   res.status(200).json({ name: 'John Doe' })
// }

const fs = require("fs")
const config = {
  host: "yasmina.emi.ac.ma",
  port: 22,
  username: "melissati",
  password: "melissati ",
  readyTimeout: 5000

}

const cwd = "/home/ginf2022/melissati/akhi/zozo.txt"

let Client = require('ssh2-sftp-client');

let client = new Client();

let data = fs.createReadStream('./zozo.txt');
let remote = cwd;

client.connect(config)
  .then(() => {
    return client.put(data, remote);
  })
  .then(() => {
    return client.end();
  })
  .catch(err => {
    console.error(err.message);
  });