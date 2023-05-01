import fs from 'fs';
import path from 'path';

import format from './parsers.js';
import genDiffTree from './tree-compar.js';

const getFilePath = (fileName) => path.resolve(process.cwd(), fileName);
const readFile = (filePath) => fs.readFileSync(getFilePath(filePath), 'utf8');

const genDiff = (file1, file2, formatName = 'stylish') => {
  const getFileData1 = readFile(file1);
  const dataFile1 = format(getFileData1, path.extname(file1));

  const getFileData2 = readFile(file2);
  const dataFile2 = format(getFileData2, path.extname(file2));

  const getTree = genDiffTree(dataFile1, dataFile2);
  // console.log(getTree)

  return format(getTree, formatName);
};

export default genDiff;
