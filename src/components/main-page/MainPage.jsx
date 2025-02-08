import axios from 'axios';
import apiParams from '../../const/fetchparams';
import { useState, useEffect } from 'react';
import Movie from '../Movie/Movie';
import './MainPage.scss'

export default function MainPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(apiParams.upcoming, {
          headers: {
            ...apiParams.headers
          }
        });
        if (response.status >= '500') {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        
        setMovies(result.results);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);




  return (
    
    <div className='main-page-content'>
     {
      (error)
      ? <p>{error.message}</p>
      : movies.map((item) => <Movie
      key={item.id}
      title={item.titleText?.text || ''}
      img={item.primaryImage?.url || ''}
      year={item.releaseDate?.year || ''}
       />)
       
      } 
     
    </div>
  )
}

