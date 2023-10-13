const cheerio = require('cheerio');
const { createObjectCsvWriter } = require('csv-writer');

const parseHTML = async (html) => {
  const $ = cheerio.load(html);
  let table1Data = [];
  let table5Data = [];

  // Iterate over the tables and parse each one.
  $('table').each((i, element) => {
    const tableData = [];

    $(element).find('tr').each((j, row) => {
      const rowData = [];
      $(row).find('td').each((k, cell) => {
        rowData.push($(cell).text());
      });
      tableData.push(rowData);
    });
    if (i === 0 && $('table').length == 15) {
      table1Data = tableData;
    } 
    else if (i === 1 && $('table').length == 16) {
      table1Data = tableData;
    }
    else if (i === 4 && $('table').length == 15) {
      table5Data = tableData;
    }
    else if (i === 5 && $('table').length == 16) {
      table5Data = tableData;
    }
  });

  //Remove the first 7 rows of table 
  table5Data = table5Data.slice(7);

  //Clean the data
  table1Data = cleanData(table1Data);
  table5Data = cleanData(table5Data);

  return {
    table1Data,
    table5Data,
  };
};

function cleanData(data) {
  // Create a new array to store the cleaned data.
  const cleanedArray = [];

  // Iterate over the array and clean each row.
  for (const row of data) {
    // Create a new row to store the cleaned data.
    const cleanedRow = [];

    // Iterate over the cells in the row and clean each cell.
    for (const cell of row) {
      // Remove the newlines and empty spaces from the cell.
      const cleanedCell = cell.replace(/\n/g, '').replace(/\s+/g, ' ');

      // Add the cleaned cell to the new row.
      cleanedRow.push(cleanedCell);
    }

    // Add the cleaned row to the new array.
    cleanedArray.push(cleanedRow);
  }

  // Return the new array.
  return cleanedArray;
}

const parseTable1ToCSV = async (table1Data, csvFilePath) => {
  // Convert the array to a JSON object.
  const jsonObject = {};
  for (const row of table1Data) {
    const key = row[0].trim().replace(':', '');;
    const value = row[1].trim();
    jsonObject[key] = value;
  }

  // Remove the desired attributes
  delete jsonObject['Address'];
  delete jsonObject['City / State / Zip'];
  delete jsonObject['Country'];

  const keys = Object.keys(jsonObject);
  const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: keys.map(key => ({ id: key, title: key })),
    append: true,
  });

  await csvWriter.writeRecords([jsonObject]);
}

const parseTable5ToCSV = async (table5Data, csvFilePath) => {
  // Get the header row.
  const headerRow = table5Data[0];

  // Check if there is only one row with a message.
  if (table5Data.length === 2 && table5Data[1].length === 1) {
    const message = table5Data[1][0];
    const jsonObject = {};

    for (let j = 0; j < headerRow.length; j++) {
      jsonObject[headerRow[j].trim()] = message.trim();
    }

    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: headerRow.map(key => key.trim()),
      alwaysQuote: true, // Optional: Quote all values to preserve leading/trailing spaces
      append: true,
    });

    await csvWriter.writeRecords([jsonObject, {}]); // Add an empty object as the last row
    return;
  }

  // Convert the rest of the array to a JSON object.
  const jsonObject = [];
  for (let i = 1; i < table5Data.length; i++) {
    const row = table5Data[i];
    const jsonObjectItem = {};
    for (let j = 0; j < headerRow.length; j++) {
      jsonObjectItem[headerRow[j].trim()] = row[j].trim();
    }
    jsonObject.push(jsonObjectItem);
  }

  const csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: headerRow.map(key => key.trim()),
    alwaysQuote: true, // Optional: Quote all values to preserve leading/trailing spaces
    append: true,
  });

  await csvWriter.writeRecords(jsonObject.concat([{}])); // Add an empty object as the last row
};

module.exports = {
  parseHTML,
  parseTable1ToCSV,
  parseTable5ToCSV
}