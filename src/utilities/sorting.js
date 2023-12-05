export function sortingByName(a, b) {
  //   console.log(a);
  //   console.log(b);
  const nameA = a.name.common.toUpperCase();
  const nameB = b.name.common.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}
