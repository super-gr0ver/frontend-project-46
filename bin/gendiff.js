#!/usr/bin/env node
import { program } from '../node_modules/commander/esm.mjs';
import * as fs from 'fs';
import _ from 'lodash';

// import genDiff from '../src/index.js';

// const program = new Command();

program
  .version('0.1.0') 
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const objFile1 = JSON.parse(fs.readFileSync(filepath1, 'utf8'));
    const objFile2 = JSON.parse(fs.readFileSync(filepath2, 'utf8'));

    const arrFile1 = Object.entries(objFile1);
    const arrFile2 = Object.entries(objFile2);
    //console.log(objFile1)

    const result = []
    for (const [key, value] of arrFile1) {
      // if (_.includes(arrFile2, 'host')) {
      
      if (_.has(objFile2, key) && objFile2[key] === value) {
        result.push(`  ${key}: ${value}`);
      }
      result.push(`- ${key}: ${value}`);
    }

    return console.log(`{\n${result.join('\n')}\n}`)
    
    // console.log(genDiff(filepath1, filepath2, options.format));
  });
  
program.parse(process.argv);

// function fileHandler(){
//   const str = JSON.parse(fs.readFileSync('file1.json', 'utf8'));
//   return console.log(str.host);
// }
// fileHandler()