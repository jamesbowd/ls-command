#!/usr/bin/env node

// import file system module from node
// Check docs here: https://nodejs.org/api
const fs = require("fs");

const chalk = require("chalk");
const path = require("path");

// Solution 2, Method 2:
// create a promise for the solution
// const util = require("util");
// const lstat = util.promisify(fs.lstat);

// Solution 2, Method 3 and solution 3
// Most fs functions have a promise implementation as well as a callback implementation
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  // Solution 1:
  // Not a good implementation due to callback happening after all the foor loop complete
  // for (let filename of filenames) {
  //   fs.lstat(filename, (err, stats) => {
  //     iff (err) {
  //       console.log(err);
  //     }
  //     console.log(filename, stats.isFile());
  //   })
  // }

  // solution 2
  // This works, but the promises are run in serial
  // for (let filename of filenames) {
  //   try {
  //     const stats = await lstat(filename);

  //     console.log(filename, stats.isFile());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // Solution 3
  const statPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(filenames[index], stats.isFile());
    } else {
      console.log(chalk.bold.blue(filenames[index]));
    }
  }
});

// Solution 2, Method 1:
// This works, but there is a promisify function that you can use in util (see above)
// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(stats);
//     });
//   });
// };
