import './slider.scss'
import { sliderImages } from '../../const/slider';
import { useState } from 'react';

export default function Slider() {
  const [slideMove, setSlideMove] = useState(0);

  const windowWidth = document.documentElement.clientWidth;

  const slideMoveStyle = {
    transform: `translateX(${slideMove}px)`,
  }

  function handleClickNext(e) {
    
    if (e.target.id === 'prev') {
      slideMove === 0
      ? setSlideMove(-windowWidth * (sliderImages.length - 1))
      : setSlideMove(slideMove + windowWidth)
    }
    if (e.target.id === 'next') {
      slideMove === -windowWidth * (sliderImages.length - 1)
    ? setSlideMove(0)
    : setSlideMove(slideMove - windowWidth)
    }
    
  }

  return (
    <div className="slider">
      <div className='slider-controls'>
        <div className="slider-button prev" id='prev' onClick={handleClickNext}>⇦</div>
        <div className="slider-button next" id='next' onClick={handleClickNext}>⇨</div>
      </div>
      <ul className='slides' id='slides' style={slideMoveStyle}>
        {sliderImages.map((image) => {
          return (<li key={image.id}>
            <img src={image.path} alt="perfect slide" />
          </li>)
        })}
      </ul>
    </div>
  )
}

