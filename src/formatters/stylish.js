import _ from 'lodash';

const replacer = ' ';
const spaceCount = 4;

const nestedIndent = (depth) => {
  const replacerCount = depth * spaceCount;
  return replacer.repeat(replacerCount);
};
const indent = (depth) => {
  const replacerCount = depth * spaceCount;
  return replacer.repeat(replacerCount - 2);
};

const bracketsIndent = (depth) => {
  const replacerCount = depth * spaceCount;
  return replacer.repeat(replacerCount - spaceCount);
};

const nodeChilds = (node, depth) => {
  if (!_.isPlainObject(node)) {
    return `${node}`;
  }
  const result = Object.entries(node).map(([key, value]) => `${nestedIndent(depth + 1)}${key}: ${nodeChilds(value, depth + 1)}`);
  return `{\n${result.join('\n')}\n${nestedIndent(depth)}}`;
};

const iter = (diffTree, depth) => {
  const valueObj = Object.values(diffTree).map((node) => {
    switch (node.status) {
      case 'deleted':
        return `${indent(depth)}- ${node.name}: ${nodeChilds(node.value, depth)}`;
      case 'added':
        return `${indent(depth)}+ ${node.name}: ${nodeChilds(node.value, depth)}`;
      case 'updated':
        return `${indent(depth)}- ${node.name}: ${nodeChilds(node.oldValue, depth)}\n${indent(depth)}+ ${node.name}: ${nodeChilds(node.newValue, depth)}`;
      case 'unchanged':
        return `${nestedIndent(depth)}${node.name}: ${nodeChilds(node.value, depth)}`;
      default:
        return `${nestedIndent(depth)}${node.name}: ${iter(node.childrens, depth + 1)}`;
    }
  });
  return `{\n${valueObj.join('\n')}\n${bracketsIndent(depth)}}`;
};

const stylish = (diffTree) => iter(diffTree, 1);

export default stylish;
