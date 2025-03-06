import { useState } from 'react'
import './searchPanel.scss'
import apiParams from '../../const/fetchparams';

export default function SearchPanel() {
  const [value, setValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [resultPosition, setResultPosition] = useState({});


  const handleSearch = async (e) => {
    setResultPosition({
      top: e.target.offsetTop + e.target.clientHeight + 10,
      left: e.target.offsetLeft,
      'min-width': e.target.clientWidth,
      'animation-name': 'show'
    });
    setValue(e.target.value);
    if (e.target.value.length < 3) {
      setResultPosition({});
      setSearchResult([]);
      return;
    };
    const response = await fetch(`${apiParams.cocktailByName}${e.target.value}`)
    const cocktailsList = await response.json();
    if (!cocktailsList.drinks) {
      setResultPosition({});
      setSearchResult([]);
      return;
    }
    setSearchResult(cocktailsList.drinks);
  }

  return (
    <>
      <div className="search-panel">
        <input type="text" id='quick-search' value={value} onChange={handleSearch} />
        <button className='search-button'>Search</button>
      </div>
      <div className='search__quick-search-wrap' style={{ ...resultPosition }}>
        <ul className='search__quick-search-list'>
          {
            searchResult &&
            searchResult.map((cocktail) => {
              return (<li key={cocktail.idDrink}>
                <div className='search__quick-search-item'>
                  <div className='search__quick-search-image'>
                    <img src={cocktail.strDrinkThumb}
                      alt={cocktail.strDrink}
                    />
                  </div>
                  <div className='search__quick-search-title'>
                    <p>{cocktail.strDrink}</p>
                  </div>
                </div>
              </li>)
            })
          }
        </ul>
      </div>
    </>
  )
}