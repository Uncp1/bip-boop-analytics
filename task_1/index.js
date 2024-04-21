import { encoded, translations } from './data.js';

const decodeData = (encoded, translations) =>
  encoded.map((item) => {
    const decodedItem = { ...item };
    Object.keys(decodedItem).forEach((key) => {
      if (
        key.endsWith('Id') &&
        key !== 'groupId' &&
        key !== 'service' &&
        key !== 'formatSize' &&
        key !== 'ca'
      ) {
        const value = decodedItem[key];
        if (value !== null && translations[value]) {
          decodedItem[key] = translations[value];
        }
      }
    });
    return decodedItem;
  });

const getUniqueIds = (encoded, translations) => {
  const uniqueIds = new Set();
  encoded.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (
        key.endsWith('Id') &&
        key !== 'groupId' &&
        key !== 'service' &&
        key !== 'formatSize' &&
        key !== 'ca'
      ) {
        const value = item[key];
        if (value !== null && translations[value]) {
          uniqueIds.add(value);
        }
      }
    });
  });
  return Array.from(uniqueIds);
};

const decoded = decodeData(encoded, translations);
console.log(decoded);

const uniqueIdsList = getUniqueIds(encoded, translations);
console.log(uniqueIdsList); // для удобства проверки через терминал
