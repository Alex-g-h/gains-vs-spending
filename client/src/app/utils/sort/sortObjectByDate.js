// sort by date
function sortObjectByDate(a, b) {
  const nameA = a.date.toUpperCase(); // ignore upper and lowercase
  const nameB = b.date.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

export default sortObjectByDate;
