import { useState } from 'react'
import './searchPanel.scss'
import { fetchParams } from '../../const/fetchparams';

export default function SearchPanel() {
  const [value, setValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState([]);
  const [resultPosition, setResultPosition] = useState({});
  const [searchInputFocus, setSearchInputFocus] = useState(false);

  const handleSearch = async (e) => {
    setResultPosition({
      top: e.target.offsetTop + e.target.clientHeight + 10,
      left: e.target.offsetLeft,
      minWidth: e.target.clientWidth,
      animationName: 'show'
    });
    setValue(e.target.value.trimStart());
    if (e.target.value.trimStart().length < 3) {
      setResultPosition({});
      setSearchResult([]);
      return;
    };
    const response = await fetch(`${fetchParams.cocktailByName}${e.target.value}`)
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
        <input
          type="text"
          id='quick-search'
          value={value}
          onChange={handleSearch}
          onFocus={() => setSearchInputFocus(true)}
          onBlur={() => setSearchInputFocus(false)}
        />
        <button className='search-button'>Search</button>
      </div>
      <div className='search__quick-search-wrap' style={{ ...resultPosition }}>
        <ul className='search__quick-search-list'>
          {
            searchResult && searchInputFocus &&
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
                    <p className='search__quick-search-type'>{cocktail.strCategory}</p>
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