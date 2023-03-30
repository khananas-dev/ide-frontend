export const arrayContainsObject = (array: any[], object: any) => {
  return array.some((item: any) =>
    Object.keys(item).every((key: any) => item[key] === object[key])
  );
};
