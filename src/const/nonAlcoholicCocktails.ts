import { fetchParams } from "./fetchparams";
import { ISimpleCocktailsLIst } from "../interfaces/ISimpleCocktailsList";

export default async function getNonAlcoholicCocktails(setNonAlcoList: (arr: ISimpleCocktailsLIst[]) => void) {
  const response = await fetch(fetchParams.nonAlcoholicCOcktails, { ...fetchParams.headers });
  const responseJson = await response.json();
  const nonAlcoholicCOcktails = responseJson.drinks;
  setNonAlcoList(nonAlcoholicCOcktails);
}


