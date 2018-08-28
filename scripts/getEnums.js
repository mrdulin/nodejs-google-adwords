function getEnums(version = 'v201809') {
  const $table = document.querySelector('table.enums');
  const $keyWrapper = $table.querySelectorAll('tbody > tr > td:first-child > code > span');
  const keys = [...$keyWrapper].map(($tr) => {
    return $tr.textContent;
  });
  return JSON.stringify(keys);
}
