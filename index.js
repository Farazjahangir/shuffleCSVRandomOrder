const fs = require('fs');
const csv = require('csv-parser');

// Function to shuffle array elements randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to read CSV file, shuffle rows, and save to a new CSV file
function shuffleCSV(inputFile, outputFile) {
  const rows = [];

  // Read CSV file
  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
      rows.push(row);
    })
    .on('end', () => {
      // Shuffle rows
      shuffleArray(rows);

      // Write to new CSV file
      const ws = fs.createWriteStream(outputFile);
      ws.write(Object.keys(rows[0]).join(',') + '\n'); // Write header
      rows.forEach((row) => {
        ws.write(Object.values(row).join(',') + '\n');
      });

      console.log('CSV file shuffled and saved successfully!');
    });
}

// Example usage
const inputFileName = 'input.csv'; // Replace with your input CSV file
const outputFileName = 'output.csv'; // Replace with desired output CSV file

shuffleCSV(inputFileName, outputFileName);