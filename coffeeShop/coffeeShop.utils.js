export const processCategories = (categories) => {
  return categories.map((category) => ({
    where: { name: category },
    create: { name: category },
  }));
};
