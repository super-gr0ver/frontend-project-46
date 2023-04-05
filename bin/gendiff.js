#!/usr/bin/env node
import { program } from "../node_modules/commander/esm.mjs";
import * as fs from "fs";
import _ from "lodash";

// import genDiff from '../src/index.js';

// const program = new Command();

program
  .version("0.1.0")
  .description("Compares two configuration files and shows a difference.")
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format <type>", "output format", "stylish")
  .action((filepath1, filepath2, options) => {
    const objFile1 = JSON.parse(fs.readFileSync(filepath1, "utf8"));
    const objFile2 = JSON.parse(fs.readFileSync(filepath2, "utf8"));
    const keysObjFiles = _.sortBy(Object.keys({ ...objFile1, ...objFile2 }));

    const result = [];
    for (const currentKey of keysObjFiles) {
      if (objFile1[currentKey] === objFile2[currentKey]) {
        result.push(`    ${currentKey}: ${objFile1[currentKey]}`);
      } else if (_.has(objFile1, currentKey) && _.has(objFile2, currentKey)) {
        result.push(
          `  - ${currentKey}: ${objFile1[currentKey]}\n  + ${currentKey}: ${objFile2[currentKey]}`
        );
      }

      if (_.has(objFile1, currentKey) && !_.has(objFile2, currentKey)) {
        result.push(`  - ${currentKey}: ${objFile1[currentKey]}`);
      }

      if (!_.has(objFile1, currentKey) && _.has(objFile2, currentKey)) {
        result.push(`  + ${currentKey}: ${objFile2[currentKey]}`);
      }
    }
    return console.log(`{\n${result.join("\n")}\n}`)
  });

program.parse(process.argv);