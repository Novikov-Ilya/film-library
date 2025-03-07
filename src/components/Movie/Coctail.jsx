import './coctail.scss';

const Coctail = ({ title, img, onClick }) => {
  return (
    <div className='coctail-item' onClick={onClick}>
      <img src={img} alt={title} />
      <div className='coctail__info-tile'>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default Coctail;