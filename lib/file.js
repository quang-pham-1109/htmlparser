const fs = require('fs');
const path = require('path');

const loadFile = async (htmlPath) => {
  const html = await fs.readFileSync(htmlPath, 'utf8');
  return html;
}

const getFilePathsInFolder = (folderPath) => {
  const files = fs.readdirSync(folderPath);
  const filePaths = [];

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      filePaths.push(filePath);
    }
  });

  return filePaths;
};

const writeFilePathsToTxt = async (array, filePath) => {
  const content = array.join('\n');
  fs.writeFileSync(filePath, content);
};

const deleteFilesInFolder = async (folderPath) => {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    fs.unlinkSync(filePath);
  });
};

module.exports = {
  loadFile,
  getFilePathsInFolder,
  writeFilePathsToTxt,
  deleteFilesInFolder
};