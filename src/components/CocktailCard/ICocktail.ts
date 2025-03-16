import { ISimpleCocktailsLIst } from "../../interfaces/ISimpleCocktailsList";

export interface ICocktail {
  [key: string]: string
}

export interface CocktailCardProps {
  id: string;
  show: boolean;
  close: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  switchCocktail: (action: string) => void;
  drinksList: ISimpleCocktailsLIst[];
}