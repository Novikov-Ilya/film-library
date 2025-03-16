interface IFetchParams {
  readonly cocktailByCategory: string;
  readonly cocktailByName: string;
  readonly nonAlcoholicCOcktails: string;
  readonly categories: string;
  readonly coctailDetailsById: string;
  readonly endPoint: string;
  headers: {
    [key: string]: string;
  }
}

export const fetchParams: IFetchParams = {
  cocktailByCategory: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
  cocktailByName: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  nonAlcoholicCOcktails: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic',
  categories: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  coctailDetailsById: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=',
  endPoint: 'https://www.thecocktaildb.com/api/json/v1/1/',
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
}