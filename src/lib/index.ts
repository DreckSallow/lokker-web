// place files you want to import through the `$lib` alias in this folder.

export function getDate(timestamp: string) {
  const date = new Date(timestamp);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${monthName} ${day}, ${year}`;
}


export function debounce(fn: Function, delay = 1000) {
  let timeoutId: number | undefined;
  return function() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fn, delay)
  }
}
