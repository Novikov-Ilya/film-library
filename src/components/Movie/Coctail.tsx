import { AlcoFreeLabel } from '../AlcoFreeLabel/AlcoFreeLabel';
import './coctail.scss';

interface CocktailProps {
  title: string;
  img: string;
  onClick: () => void;
  nonAlco: boolean;
}

const Coctail = ({ title, img, onClick, nonAlco }: CocktailProps) => {
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