import fetchparams from "./fetchparams";

export default async function getCategories(setParam) {
  const response = await fetch(fetchparams.aCategories, {...fetchparams.headers});
  const categoriesJson = await response.json();
  const categories = categoriesJson.drinks.map((item) => {
    return item.strCategory.replaceAll(' ', '_');
  });
  console.log('categories ', categories)
  setParam(categories);
}


