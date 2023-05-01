import _ from 'lodash';

const replacer = ' ';
const spaceCount = 4;

const currentIndent = (depth) => {
  const replacerCount = depth * spaceCount;
  return replacer.repeat(replacerCount);
};
const indent = (depth) => {
  const replacerCount = depth * spaceCount;
  return replacer.repeat(replacerCount - 2);
};


const nodeChilds = (node, depth) => {
  if (!_.isPlainObject(node)) {
    return `${node}`;
  }
  const result = Object.entries(node).map(
    ([key, value]) =>
      `${currentIndent(depth + 1)}${key}: ${nodeChilds(value, depth + 1)}`
  );
  return `{\n${result.join('\n')}\n${currentIndent(depth)}}`;
};


const iter = (diffTree, depth) => {
  const valueObj = Object.values(diffTree).map((node) => {
    switch (node.status) {
      case 'deleted':
        return `${indent(depth)}- ${node.name}: ${nodeChilds(
          node.value,
          depth
        )}`;
      case 'added':
        return `${indent(depth)}+ ${node.name}: ${nodeChilds(node.value,depth)}`;
      case 'changed':
        return `${indent(depth)}- ${node.name}: ${nodeChilds(node.oldValue,depth
        )}\n${indent(depth)}+ ${node.name}: ${nodeChilds(node.newValue,depth)}`;
      case 'unchanged':
        return `${currentIndent(depth)}${node.name}: ${nodeChilds(node.value,depth)}`;
      case 'nested':
        return `${currentIndent(depth)}${node.name}: ${iter(node.value, depth)}`;
    }
  });
  return `{\n${valueObj.join('\n')}\n}`;
};

const stylish = (diffTree) => iter(diffTree, 1);
// const stylish = (diffTree) => diffTree;

export default stylish;