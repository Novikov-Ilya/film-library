import apiParams from '../../const/fetchparams';
import { useState, useEffect } from 'react';
import Coctail from '../Movie/Coctail';
import './mainPage.scss'
import CoctailCard from '../MovieCard/CoctailCard';
import Tabs from '../Tabs/Tabs';
import getNonAlcoholicCocktails from '../../const/nonAlcoholicCocktails';

export default function MainPage() {
  const [coctails, setCoctails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCoctail, setShowCoctail] = useState(false);
  const [currentCoctail, setCurrentCoctail] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('Cocktail');
  const [nonAlcoholicCocktails, setNonAlcoholicCocktails] = useState([])

  useEffect(() => {
    getNonAlcoholicCocktails(setNonAlcoholicCocktails);
  }, [])

  function handleClick(id) {
    setShowCoctail(true);
    setCurrentCoctail(id);
  }

  function switchCocktail(direction) {
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

  function closeModal(e) {
    e.stopPropagation();
    if (e.target.classList.contains('modal__background')
      || e.target.dataset.action == 'close-modal') {
      setShowCoctail(false)
    }

  }

  function selectCategory(category) {
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

    function addAlcoholFreeLabel(allCocktails) {
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
      let allCocktails;
      try {
        const response = await fetch(`${apiParams.cocktailByCategory}${currentCategory}`, { ...apiParams.headers });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        allCocktails = result.drinks
      } catch (e) {
        setError(e);
        console.log(e);
      } finally {
        setLoading(false);
        addAlcoholFreeLabel(allCocktails);
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

