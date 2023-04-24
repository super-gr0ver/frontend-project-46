import fs from 'fs';
import path from 'path';
import genDiffTree from './tree-compar.js';

const getFilePath = (fileName) => path.resolve(process.cwd(), fileName);
const readFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const genDiff = (file1, file2) => {
  const file1Path = getFilePath(file1);
  const file1Date = readFile(file1Path);

  const file2Path = getFilePath(file2);
  const file2Date = readFile(file2Path);

  return genDiffTree(file1Date, file2Date);
};

export default genDiff;
