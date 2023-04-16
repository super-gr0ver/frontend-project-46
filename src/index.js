import fs from 'fs';
import path from 'path';
import genDiffTree from "./file-compar.js";

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => JSON.parse(fs.readFileSync(filepath, "utf8"));

const genDiff = (file1, file2) => {
  const file1Path = getFilePath(file1);
  const file1Date = readFile(file1Path);

  const file2Path = getFilePath(file2);
  const file2Date = readFile(file2Path);

  return genDiffTree(file1Date, file2Date);
};

export default genDiff;
