const recipes = input.trim().split('\n').map(line => {
  const parts = line.split(' (contains ');
  return {
    ingredients: parts[0].split(' '),
    allergens: parts[1].slice(0, -1).split(', ')
  };
});

const allAllergens = Array.from(new Set(recipes.flatMap(recipe => recipe.allergens))).sort();

let allergenIngredients = allAllergens.map(allergen => recipes
  .filter(recipe => recipe.allergens.includes(allergen))
  .map(recipe => recipe.ingredients)
  .reduce((finalList, list) => finalList.filter(ingredient => list.includes(ingredient)))
);

while (allergenIngredients.some(list => list.length > 1)) {
  const assignedIngredients = allergenIngredients.flatMap(list => list.length > 1 ? [] : list);
  allergenIngredients = allergenIngredients.map(list => list.length > 1 ? list.filter(ingredient => !assignedIngredients.includes(ingredient)) : list);
}

console.log(recipes.flatMap(recipe => recipe.ingredients.filter(ingredient => !allergenIngredients.flat().includes(ingredient))).length);

console.log(allergenIngredients.join());
