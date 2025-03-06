import fetchparams from "./fetchparams";

export default async function getCategories(setParam) {
  const response = await fetch(fetchparams.alcoCategories, {...fetchparams.headers});
  const categoriesJson = await response.json();
  const categories = categoriesJson.drinks.map((item) => {
    return item.strCategory.replaceAll(' ', '_');
  });
  setParam(categories);
}


