const fs = require('fs');
const csv = require("fast-csv");
const _ = require('lodash')


// Function to shuffle array elements randomly
function shuffleArray(array) {
  return _.shuffle(array)
}

// Function to read CSV file, shuffle rows, and save to a new CSV file
function shuffleCSV(inputFile, outputFile) {
  const rows = [];

  // Read CSV file
  fs.createReadStream(inputFile)
    .pipe(csv.parse({ headers: true }))
    .on('data', (row) => {
      rows.push(row);
    })
    .on('end', () => {
      // Shuffle rows
      const shuffledData = shuffleArray(rows);
      const ws = fs.createWriteStream(outputFile);
      csv
        .write(shuffledData, { headers: true })
        .pipe(ws)
        .on("finish", function () {
          console.log("CSV file shuffled and saved successfully!");
        })
        .on("error", function (err) {
          console.error("Error shuffling CSV file:", err);
        });
    });
}

// Example usage
const inputFileName = 'input.csv'; 
const outputFileName = 'output.csv';

shuffleCSV(inputFileName, outputFileName);