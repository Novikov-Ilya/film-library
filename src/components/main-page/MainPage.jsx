import apiParams from '../../const/fetchparams';
import { useState, useEffect } from 'react';
import Coctail from '../Movie/Coctail';
import './MainPage.scss'
import CoctailCard from '../MovieCard/CoctailCard';
import Tabs from '../Tabs/Tabs';

export default function MainPage() {
  const [coctails, setCoctails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCoctail, setShowCoctail] = useState(false);
  const [currentCoctail, setCurrentCoctail] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('Cocktail');
  const [currentCocktailIndex, setCurrentCocktailIndex] = useState(null)

  function handleClick(id, index) {
    setShowCoctail(true);
    setCurrentCoctail(id);
    setCurrentCocktailIndex(index);
  }

  function switchCocktail(e) {
    let index;
    switch (e.target.innerText) {
      case 'Next':
        index = currentCocktailIndex + 1;
        if (index > coctails.length - 1) {
          index = 0
        }
        setCurrentCocktailIndex(index);
        setCurrentCoctail(coctails[index].idDrink);
        break;

      case 'Previous':
        index = currentCocktailIndex - 1;
        if (index < 0) {
          index = coctails.length - 1
        }
        setCurrentCocktailIndex(index);
        setCurrentCoctail(coctails[index].idDrink);
        break;
      default:
        break;
    }
  }

  function closeModal() {
    setShowCoctail(false)
  }

  function selectCategory(e) {
    setCurrentCategory(e)
  }

  useEffect(() => {
    const getCocktails = async () => {
      try {
        const response = await fetch(`${apiParams.filter}${currentCategory}`, { ...apiParams.headers });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setCoctails(result.drinks);
      } catch (e) {
        setError(e);
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getCocktails();
  }, [currentCategory]);

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
            : coctails.map((item, index) => <Coctail
              onClick={() => handleClick(item.idDrink, index)}
              key={item.idDrink}
              title={item.strDrink || ''}
              img={item.strDrinkThumb || './src/assets/imageplaceholder.png'}
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

