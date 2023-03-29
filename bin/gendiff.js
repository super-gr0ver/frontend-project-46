#!/usr/bin/env node
import { program } from '../node_modules/commander/esm.mjs';
import * as fs from 'fs';
// import genDiff from '../src/index.js';

// const program = new Command();

// program
//   .version('0.1.0') 
//   .description('Compares two configuration files and shows a difference.')
//   .arguments('<filepath1> <filepath2>')
//   .option('-f, --format <type>', 'output format', 'stylish')
//   .action((filepath1, filepath2, options) => {
//     console.log(genDiff(filepath1, filepath2, options.format));
//   });
  
// program.parse(process.argv);

function fileHandler(){
  const str = JSON.parse(fs.readFileSync('file1.json', 'utf8'));
  return console.log(str.host);

  
  
}

fileHandler()