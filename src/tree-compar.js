import _ from 'lodash';

const genDiffTree = (file1Date, file2Date) => {
  const keys = Object.keys({ ...file1Date, ...file2Date });
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    if (!_.has(file1Date, key)) {
      return { name: key, value: file2Date[key], status: 'added' };
    }
    if (!_.has(file2Date, key)) {
      return { name: key, value: file1Date[key], status: 'deleted' };
    }
    if (_.isPlainObject(file1Date[key]) && _.isPlainObject(file2Date[key])) {
      return {
        name: key, value: genDiffTree(file1Date[key], file2Date[key]), childrens: genDiffTree(file1Date[key], file2Date[key]), status: 'nested',
      };
    }
    if (file1Date[key] !== file2Date[key]) {
      return {
        name: key, oldValue: file1Date[key], newValue: file2Date[key], status: 'changed',
      };
    }

    return { name: key, value: file1Date[key], status: 'unchanged' };
  });
};
export default genDiffTree;
