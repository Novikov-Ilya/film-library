import { fetchParams } from '../../const/fetchparams';
import { useState, useEffect } from 'react';
import Coctail from '../Movie/Coctail';
import './mainPage.scss'
import CoctailCard from '../CocktailCard/CoctailCard';
import Tabs from '../Tabs/Tabs';
import getNonAlcoholicCocktails from '../../const/nonAlcoholicCocktails';
import { ISimpleCocktailsLIst } from '../../interfaces/ISimpleCocktailsList';

interface CustomElement extends Element {
  dataset: {
    [key: string]: string;
  }
}

export default function MainPage() {
  const [coctails, setCoctails] = useState<ISimpleCocktailsLIst[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [showCoctail, setShowCoctail] = useState<boolean>(false);
  const [currentCoctail, setCurrentCoctail] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<string>('Cocktail');
  const [nonAlcoholicCocktails, setNonAlcoholicCocktails] = useState<ISimpleCocktailsLIst[]>([])

  useEffect(() => {
    getNonAlcoholicCocktails(setNonAlcoholicCocktails);
  }, [])

  function handleClick(id: string) {
    setShowCoctail(true);
    setCurrentCoctail(id);
  }

  function switchCocktail(direction: string) {
    let index;
    switch (direction) {
      case 'next':
        index = coctails.findIndex(i => i.idDrink == currentCoctail) + 1;
        if (index > coctails.length - 1) {
          index = 0
        }
        setCurrentCoctail(coctails[index].idDrink);
        break;

      case 'prev':
        index = coctails.findIndex(i => i.idDrink == currentCoctail) - 1;
        if (index < 0) {
          index = coctails.length - 1
        }
        setCurrentCoctail(coctails[index].idDrink);
        break;
      default:
        break;
    }
  }

  function closeModal(e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) {
    e.stopPropagation();
    const target = e.target as CustomElement;
    if (target.classList.contains('modal__background')
      || target.dataset.action == 'close-modal') {
      setShowCoctail(false)
    }
  }

  function selectCategory(category: string) {
    setCurrentCategory(category)
  }

  useEffect(() => {
    if (showCoctail) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showCoctail])

  useEffect(() => {
    const nonAlcoCocktails = nonAlcoholicCocktails;

    function addAlcoholFreeLabel(allCocktails: ISimpleCocktailsLIst[]) {
      allCocktails.forEach((allitem) => {
        nonAlcoCocktails.forEach((nitem) => {
          if (allitem.idDrink === nitem.idDrink) {
            allitem.alcoFree = true;
          }
        })
      })
      setCoctails(allCocktails);
    }

    const getCocktails = async () => {
      let allCocktails: ISimpleCocktailsLIst[];
      try {
        const response = await fetch(`${fetchParams.cocktailByCategory}${currentCategory}`, { ...fetchParams.headers });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        allCocktails = result.drinks;
        addAlcoholFreeLabel(allCocktails);
      } catch (e) {
        setError(e as Error);
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    if (nonAlcoholicCocktails.length > 0) {
      getCocktails();
    }

  }, [currentCategory, nonAlcoholicCocktails]);

  return (
    <>
      <Tabs select={selectCategory} active={currentCategory} />
      <div className='main-page-content'>
        {
          error
            ? <p>{error.message}</p> : null
        }
        {
          loading
            ? <p>Loading...</p>
            : coctails.map((item) => <Coctail
              onClick={() => handleClick(item.idDrink)}
              key={item.idDrink}
              title={item.strDrink || ''}
              img={item.strDrinkThumb || './src/assets/imageplaceholder.png'}
              nonAlco={item.alcoFree}
            />)
        }
        {
          showCoctail &&
          <CoctailCard
            show={showCoctail}
            id={currentCoctail}
            close={closeModal}
            drinksList={coctails}
            switchCocktail={switchCocktail}
          />
        }
      </div>
    </>
  )
}

