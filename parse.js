import yaml from 'js-yaml';

const dataParse = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`${format} is not supported`);
  }
};

export default dataParse;
