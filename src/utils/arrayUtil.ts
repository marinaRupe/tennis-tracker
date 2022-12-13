const compareByProperty = <T extends Record<string, unknown>>(
  item1: T,
  item2: T,
  propertyName: keyof T,
  ascending: boolean = true
): number => {
  const sign = ascending ? 1 : -1;

  if (item1[propertyName] === item2[propertyName]) return 0;
  if (item1[propertyName] > item2[propertyName]) return 1 * sign;

  return -1 * sign;
};

const compareByPropertyAscending = <T extends Record<string, unknown>>(
  item1: T,
  item2: T,
  propertyName: keyof T
): number => compareByProperty(item1, item2, propertyName, true);

const compareByPropertyDescending = <T extends Record<string, unknown>>(
  item1: T,
  item2: T,
  propertyName: keyof T
): number => compareByProperty(item1, item2, propertyName, false);

export const sortByProperty = <T extends Record<string, unknown>>(
  array: T[],
  propertyName: keyof T,
  ascending: boolean = true
): T[] => (
    ascending
      ? [...array].sort((item1, item2) => compareByPropertyAscending(item1, item2, propertyName))
      : [...array].sort((item1, item2) => compareByPropertyDescending(item1, item2, propertyName))
  );
