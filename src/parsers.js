import yaml from 'js-yaml';
import stylish from './stylish.js';

const parseObj = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case "json":
      return JSON.stringify(data, null);
    // case 'plain':
    //   return plain(data);

    case ".json":
      return JSON.parse(data);
    case ".yml":
    case ".yaml":
      return yaml.load(data);
    default:
    // throw new Error(`${format} is not supported`);
  }
};

export default parseObj;
