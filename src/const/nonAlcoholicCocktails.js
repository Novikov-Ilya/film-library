import fetchparams from "./fetchparams";

export default async function getNonAlcoholicCocktails(setNonAlcoList) {
  const response = await fetch(fetchparams.nonAlcoholicCOcktails, {...fetchparams.headers});
  const responseJson = await response.json();
  const nonAlcoholicCOcktails = responseJson.drinks;
  setNonAlcoList(nonAlcoholicCOcktails);
}


