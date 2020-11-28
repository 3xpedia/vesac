let registry = {};

const set = (key, value) => {
  registry[key] = value;
  return value;
};

const get = key => {
  return registry[key];
};

const remove = key => {
  const value = get(key);
  delete registry[key];
  return value;
};

const clear = () => {
  registry = {};
};

module.exports = {
  set,
  get,
  remove,
  clear,
};
