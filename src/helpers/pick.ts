export default <T>(
  obj: T,
  predicate: (value: T[keyof T], key?: keyof T) => boolean
) => {
  const result: Partial<T> = {};
  let key: keyof T;

  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }

  return result;
};
