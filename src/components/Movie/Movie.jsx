import './movie.scss';

const Movie = ({ title, year, img }) => {
  return (
    <div className='movie-item'>
      <img src={img} alt={title} />
      <div className='movie-info-tile'>
        <p>{title}</p>
        <p>{year}</p>
      </div>

    </div>
  )
}

export default Movie;