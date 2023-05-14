import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import url from 'url';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFilePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFilePath(fileName), 'utf8');

const stylishDif = readFile('stylish.txt');
const plainDif = readFile('plain.txt');
const jsonDif = readFile('json.txt');
const extensions = ['yamp', 'yml', 'json'];

test.each(extensions)(`Check difference between ${extensions} files`, (ext) => {
  const file1Path = getFilePath(`file1.${ext}`);
  const file2Path = getFilePath(`file2.${ext}`);
  expect(genDiff(file1Path, file2Path)).toEqual(stylishDif);
  expect(genDiff(file1Path, file2Path, 'stylish')).toEqual(stylishDif);
  expect(genDiff(file1Path, file2Path, 'plain')).toEqual(plainDif);
  expect(genDiff(file1Path, file2Path, 'json')).toEqual(jsonDif);
});
