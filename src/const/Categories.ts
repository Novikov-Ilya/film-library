import { fetchParams } from "./fetchparams";

interface ICategories {
  strCategory: string;
}

export default async function getCategories(setParam: (cats: ICategories[]) => void) {
  const response = await fetch(fetchParams.categories, { ...fetchParams.headers });
  const categoriesJson = await response.json();
  const categories = categoriesJson.drinks.map((item: ICategories) => {
    return item.strCategory.replaceAll(' ', '_');
  });
  setParam(categories);
}


