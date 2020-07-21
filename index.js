// import file system module from node
// Check docs here: https://nodejs.org/api
const fs = require("fs");

fs.readdir(".", (err, filenames) => {
  if (err) {
    console.log(err);
  }
  console.log(filenames);
});
