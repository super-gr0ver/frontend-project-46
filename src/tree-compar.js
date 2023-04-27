import _ from 'lodash';

const genDiffTree = (file1Date, file2Date) => {
  const keys = Object.keys({ ...file1Date, ...file2Date })
  const sortedKeys = _.sortBy(keys)
  return sortedKeys.map((key) => {
    if (!_.has(file1Date, key)) {
      return { name: key, value: file2Date[key], status: 'added' };
    }
    if (!_.has(file2Date, key)) {
      return { name: key, value: file1Date[key], status: 'deleted' };
    }
    if (_.isPlainObject(file1Date[key]) && _.isPlainObject(file2Date[key])) {
      return { name: key, value: genDiffTree(file1Date[key], file2Date[key]), status: 'nested' };
    }
    
    if ((_.has(file1Date, key)) && (_.has(file2Date, key))) {
      if (file1Date[key] !== file2Date[key]) {
        return { name: key, value1: file1Date[key], value2: file2Date[key], status: 'changed' };
      } 
    }
    
    return { name: key, value: file1Date[key], status: 'unchanged' };
  });
};
export default genDiffTree;






// const genDiffTree = (file1Date, file2Date) => {
//   const keysObjFiles = getKeys(file1Date, file2Date);
//   const result = keysObjFiles.reduce((acc, key) => {
    

//     if (file1Date[key] === file2Date[key]) {
//     } else if (_.has(file1Date, key) && _.has(file2Date, key)) {
//       acc.push(`  - ${key}: ${file1Date[key]}\n  + ${key}: ${file2Date[key]}`);
//     }
//     if (_.has(file1Date, key) && !_.has(file2Date, key)) {
//       acc.push(`  - ${key}: ${file1Date[key]}`);
//     }
//     if (!_.has(file1Date, key) && _.has(file2Date, key)) {
//       acc.push(`  + ${key}: ${file2Date[key]}`);
//     }
//     return acc;
//   }, []);

//   return `{\n${result.join('\n')}\n}`;
// };


