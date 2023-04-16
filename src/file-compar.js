import _ from 'lodash';

const genDiffTree = (filepath1, filepath2) => {
  const keyConcat = Object.keys({ ...filepath1, ...filepath2 })
  const keysObjFiles = _.sortBy(keyConcat);

  const result = keysObjFiles.reduce((acc, key) => {
    if (filepath1[key] === filepath2[key]) {
      acc.push(`    ${key}: ${filepath1[key]}`);
    } else if (_.has(filepath1, key) && _.has(filepath2, key)) {
      acc.push(`  - ${key}: ${filepath1[key]}\n  + ${key}: ${filepath2[key]}`);
    }
    if (_.has(filepath1, key) && !_.has(filepath2, key)) {
      acc.push(`  - ${key}: ${filepath1[key]}`);
    }
    if (!_.has(filepath1, key) && _.has(filepath2, key)) {
      acc.push(`  + ${key}: ${filepath2[key]}`);
    }
    return acc;
  }, []);

  return `{\n${result.join('\n')}\n}`;
};

export default genDiffTree;
