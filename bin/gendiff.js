#!/usr/bin/env node
import _ from 'lodash';
import fs from 'fs';
import { program } from 'commander/esm.mjs';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const objFile1 = JSON.parse(fs.readFileSync(filepath1, 'utf8'));
    const objFile2 = JSON.parse(fs.readFileSync(filepath2, 'utf8'));
    const keysObjFiles = _.sortBy(Object.keys({ ...objFile1, ...objFile2 }));

    const result = keysObjFiles.reduce((acc, key) => {
      if (objFile1[key] === objFile2[key]) {
        acc.push(`    ${key}: ${objFile1[key]}`);
      } else if (_.has(objFile1, key) && _.has(objFile2, key)) {
        acc.push(
          `  - ${key}: ${objFile1[key]}\n  + ${key}: ${objFile2[key]}`,
        );
      }
      if (_.has(objFile1, key) && !_.has(objFile2, key)) {
        acc.push(`  - ${key}: ${objFile1[key]}`);
      }
      if (!_.has(objFile1, key) && _.has(objFile2, key)) {
        acc.push(`  + ${key}: ${objFile2[key]}`);
      }
      return acc;
    }, []);

    return console.log(`{\n${result.join('\n')}\n}`);
  });

program.parse(process.argv);