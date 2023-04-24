import _ from 'lodash';

const getKeys =  (file1Date, file2Date) => {
  const keys = Object.keys({ ...file1Date, ...file2Date });
  return _.sortBy(keys)
} 
const genDiffTree = (file1Date, file2Date) => {
  const keysObjFiles = getKeys(file1Date, file2Date)
  const result = keysObjFiles.reduce((acc, key) => {
    if (file1Date[key] === file2Date[key]) {
      acc.push(`    ${key}: ${file1Date[key]}`);
    } else if (_.has(file1Date, key) && _.has(file2Date, key)) {
      acc.push(`  - ${key}: ${file1Date[key]}\n  + ${key}: ${file2Date[key]}`);
    }
    if (_.has(file1Date, key) && !_.has(file2Date, key)) {
      acc.push(`  - ${key}: ${file1Date[key]}`);
    }
    if (!_.has(file1Date, key) && _.has(file2Date, key)) {
      acc.push(`  + ${key}: ${file2Date[key]}`);
    }
    return acc;
  }, []);

  return `{\n${result.join('\n')}\n}`;
};

export default genDiffTree;
