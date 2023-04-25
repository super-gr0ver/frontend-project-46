import fs from 'fs';
import path from 'path';
import genDiffTree from './tree-compar.js';
import parseObj from './parsers.js';

const getFilePath = (fileName) => path.resolve(process.cwd(), fileName);
const readFile = (filePath) => fs.readFileSync(getFilePath(filePath), 'utf8');

const genDiff = (file1, file2) => {
  const file1Data = readFile(file1);
  const parseObj1 = parseObj(file1Data, path.extname(file1));

  const file2Data = readFile(file2);
  const parseObj2 = parseObj(file2Data, path.extname(file2));

  return genDiffTree(parseObj1, parseObj2);
};

export default genDiff;
