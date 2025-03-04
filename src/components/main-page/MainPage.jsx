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
  const [currentCategory, setCurrentCategory] = useState('Cocktail')

  function handleClick(id) {
    setShowCoctail(true);
    setCurrentCoctail(id);
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
          if (response.status == 429) {
            throw new Error("Limit is reached")
          }
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
      <Tabs select={selectCategory}/>
      <div className='main-page-content'>
        {
          error
            ? <p>{error.message}</p> : null}
        {loading
          ? <p>Loading...</p>
          : coctails.map((item) => <Coctail
            onClick={() => handleClick(item.idDrink)}
            key={item.idDrink}
            title={item.strDrink || ''}
            img={item.strDrinkThumb || './src/assets/imageplaceholder.png'}
          />)
        }
        {showCoctail && <CoctailCard show={showCoctail} id={currentCoctail} close={closeModal} />}
      </div>
    </>
  )
}

