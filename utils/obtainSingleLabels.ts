export function obtainSingleLabels(array: any) {
  const unique: any = [];
  for (const value of array) {
    if (!unique.includes(value)) {
      unique.push(value);
    }
  }
  return unique;
}
