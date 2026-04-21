// словарь
const WORD_DICTIONARY: Record<string, string> = {
  jenskie: 'Женские',
  mujskie: 'Мужские',
  detskie: 'Детские',

  noski: 'Носки',
  kolgotki: 'Колготки',

  polotenca: 'Полотенца',
  kuhonnie: 'Кухонные',
  salfetki: 'Салфетки',

  sumki: 'Сумки',
};

// категории
const CATEGORY_MAP: Record<string, string> = {
  noski: 'Одежда',
  kolgotki: 'Одежда',

  polotenca: 'Текстиль',
  salfetki: 'Текстиль',

  sumki: 'Аксессуары',
};

// парсим имя файла
const parseFileName = (image: string): string[] => {
  const file = image.split('/').pop()?.split('.')[0] || '';

  return file
    .replace(/\(.*?\)/g, '')
    .toLowerCase()
    .split('-')
    .filter(Boolean);
};

// капс
const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

// имя
const buildName = (tokens: string[]): string => {
  return tokens
    .map((t) => WORD_DICTIONARY[t] || capitalize(t))
    .join(' ');
};

// категория
const detectCategory = (tokens: string[]): string => {
  for (const t of tokens) {
    if (CATEGORY_MAP[t]) return CATEGORY_MAP[t];
  }
  return 'Разное';
};

// 🔥 главный экспорт
export const normalizeProducts = (products: any[]) => {
  return products.map((item) => {
    const tokens = parseFileName(item.image);

    return {
      ...item,
      name: buildName(tokens),
      category: detectCategory(tokens),
    };
  });
};