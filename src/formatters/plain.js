import _ from 'lodash';

const value = (currentValue) => (_.isPlainObject(currentValue)) ? `[complex value]` : currentValue;

const plain = (tree, parent) => tree.flatMap((item) => {
  switch (item.status) {
    case 'added':
      return `Property ${parent}.${item.name} was ${item.status} with value: ${value(item.value)}` ;
    case 'deleted':
      return `Property ${parent}.${item.name} was removed`
    case 'updated':
        return `Property ${parent}.${item.name} was ${item.status}. From ${value(item.oldValue)} to ${value(item.newValue)}`
    case 'nested':
      return `${plain(item.childrens, item.name).join('\n')}`;
      return `${iter(node.children, [[...parent, node.key].join('.')]).join('\n')}`;
  
    default:
      console.log('error')
  }
});

export default plain;
