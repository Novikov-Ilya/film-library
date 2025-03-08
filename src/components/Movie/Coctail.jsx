import './coctail.scss';

const Coctail = ({ title, img, onClick, nonAlco }) => {
  return (
    <div className='coctail-item' onClick={onClick}>
      {
        nonAlco
          ? <div className='cocktail-item__non-alco-label'></div>
          : null
      }
      <img src={img} alt={title} />
      <div className='coctail__info-tile'>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default Coctail;