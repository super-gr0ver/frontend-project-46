import _ from 'lodash';

const nodeChilds = (node, depth) => {
  if (!_.isPlainObject(node)) {
    return `${node}`;
  }
  const result = Object.entries(node).map(
    ([key, value]) => `${key}: ${nodeChilds(value, depth + 1)}`
  );
  return `{\n${result.join('\n')}\n}`;
};

const iter = (diffTree, depth) => {
  const replacer = ' ';
  const spaceCount = 4;
  const replacerCount = depth * spaceCount;
  const currentIndent = replacer.repeat(replacerCount);

  const valueObj = Object.values(diffTree).map((node) => {
    switch (node.status) {
      case 'deleted':
        return `${currentIndent}- ${node.name}: ${nodeChilds(node.value, depth)}`;
      case 'added':
        return `${currentIndent}+ ${node.name}: ${nodeChilds(node.value, depth)}`;
      case 'changed':
        return `${currentIndent}- ${node.name}: ${nodeChilds(node.oldValue, depth)}\n${currentIndent}+ ${node.name}: ${nodeChilds(node.newValue, depth)}`;
      case 'unchanged':
        return `  ${currentIndent}${node.name}: ${nodeChilds(node.value, depth)}`;
      case 'nested':
        return `! ${node.name}: ${iter(node.value, depth)}`;
    }
  });
  return `{\n${valueObj.join('\n')}\n}`;
};

const stylish = (diffTree) => iter(diffTree, 1);
// const stylish = (diffTree) => diffTree;

export default stylish;
