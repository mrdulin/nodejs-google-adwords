function getSelectorFields(serviceName, stringify = true, unique = true, version = 'v201809') {
  const id = `#${version}-${serviceName}`;
  const $wrapper = document.querySelector(`${id} ~ .devsite-table-wrapper`);
  const $trs = $wrapper.querySelectorAll('tr:not(:first-child)');
  const $tds = [...$trs].map(($tr) => $tr.querySelector('td:first-child'));
  const rawFields = $tds.map(($td) => {
    return $td.textContent;
  });

  const fields = unique ? uniqueArray(rawFields) : rawFields;
  return stringify ? JSON.stringify(fields) : fields;
}

function uniqueArray(arr) {
  return arr.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
}

export { getSelectorFields };
