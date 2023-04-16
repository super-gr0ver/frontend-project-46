import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import url from 'url';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFilePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFilePath(fileName), 'utf8');

test('Check difference between files', () => {
  const file1Path = getFilePath('file1.json');
  const file2Path = getFilePath('file2.json');
  const getDif = readFile('diffile.txt');

  expect(genDiff(file1Path, file2Path)).toEqual(getDif);
});
