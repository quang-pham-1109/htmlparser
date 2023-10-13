const {loadFile, getFilePathsInFolder, writeFilePathsToTxt, deleteFilesInFolder} = require('./lib/file');
const {parseHTML, parseTable1ToCSV, parseTable5ToCSV} = require('./lib/parse');
const inputPath = __dirname + '/samples';
const outputPath = __dirname + '/output';

const main = async () => {
  await deleteFilesInFolder(outputPath);
  const files = await getFilePathsInFolder(inputPath);
  await writeFilePathsToTxt(files, outputPath + '/filePaths.txt');

  files.forEach(async (file) => {
    const html = await loadFile(file);
    const data = await parseHTML(html);
    
    await parseTable1ToCSV(data.table1Data, outputPath + '/Contact Information.csv');
    await parseTable5ToCSV(data.table5Data, outputPath + '/Team Member.csv');
    console.log('File processed: ' + file);
  })
};

main();