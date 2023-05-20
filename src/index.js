import fs from 'fs';
import path from 'path';

import format from './formatters/index.js';
import parse from './parse.js';
import genDiffTree from './gendifftree.js';

const getFilePath = (fileName) => path.resolve(process.cwd(), fileName);
const readFile = (fileName) => fs.readFileSync(getFilePath(fileName), 'utf8');

const genDiff = (file1, file2, formatName = 'stylish') => {
  const getFileData1 = readFile(file1);
  const dataFile1 = parse(getFileData1, path.extname(file1));

  const getFileData2 = readFile(file2);
  const dataFile2 = parse(getFileData2, path.extname(file2));

  const getTree = genDiffTree(dataFile1, dataFile2);

  return format(getTree, formatName);
};

export default genDiff;
