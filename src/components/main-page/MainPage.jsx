import axios from 'axios';
import apiParams from '../../const/fetchparams';
import { useState, useEffect } from 'react';
import Movie from '../Movie/Movie';
import ErrorBoundary from './ErrorBoundary';

export default function MainPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(apiParams.upcoming, {
          headers: {
            ...apiParams.headers,
            'Access-Control-Allow-Origin': '*'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        
        setMovies(result.results);
        console.log(result.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);




  return (
    
    <div className='main-page-content'>
     {
      movies.map((item) => <div key={item.id}>{item.titleText.text}</div>)
      } 
     
    </div>
  )
}

