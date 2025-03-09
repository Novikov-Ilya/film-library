import AlcoFreeLabel from '../AlcoFreeLabel/AlcoFreeLabel';
import './coctail.scss';

const Coctail = ({ title, img, onClick, nonAlco }) => {
  return (
    <div className='coctail-item' onClick={onClick}>
      {
        nonAlco
          ? <AlcoFreeLabel />
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