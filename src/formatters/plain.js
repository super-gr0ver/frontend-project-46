import _ from 'lodash';

const composValue = (currentValue) => {
  if (!_.isPlainObject(currentValue)) {
    return (typeof (currentValue) === 'string') ? `'${currentValue}'` : currentValue;
  }
  return '[complex value]';
};

const plain = (tree) => {
  const iter = (node, ancestry = []) => {
    const nestedPath = [...ancestry, node.name];
    const path = nestedPath.join('.');

    switch (node.status) {
      case 'added':
        return `Property '${path}' was added with value: ${composValue(node.value)}`;
      case 'deleted':
        return `Property '${path}' was removed`;
      case 'updated':
        return `Property '${path}' was updated. From ${composValue(node.oldValue)} to ${composValue(node.newValue)}`;
      case 'nested':
        return node.childrens.filter((item) => item.status !== 'unchanged')
          .flatMap((item) => iter(item, nestedPath));
      case 'unchanged':
        return null;
      default:
        throw new Error(`Unknown status: ${node.status}`);
    }
  };
  const result = tree.flatMap((node) => iter(node)).join('\n');
  return result;
};

export default plain;
