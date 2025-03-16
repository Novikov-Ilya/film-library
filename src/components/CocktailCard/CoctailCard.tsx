import React, { useEffect, useState } from "react";
import { fetchParams } from '../../const/fetchparams';
import './coctailCard.scss';
import Button from "../Button/Button";
import { AlcoFreeLabel } from "../AlcoFreeLabel/AlcoFreeLabel";
import { ICocktail, CocktailCardProps } from "./ICocktail";

export default function CoctailCard({ id, show, close, switchCocktail }: CocktailCardProps) {
  const [currentCoctail, setCurrentCoctail] = useState<ICocktail>({});
  const [animation, setAnimation] = useState('')

  let startTouchX: number | null;
  let endTouchX: number | null;
  let directionSwitch: string;

  async function getCoctail(id: string) {

    const response = await fetch(`${fetchParams.coctailDetailsById}${id}`,
      {
        ...fetchParams.headers
      }
    );
    const coctailDetails = await response.json();
    setCurrentCoctail(coctailDetails.drinks[0]);
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startTouchX = Math.round(e.changedTouches[0].pageX);
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    endTouchX = Math.round(e.changedTouches[0].pageX);
    if (startTouchX! - endTouchX < 0) {
      directionSwitch = 'prev';
      startTouchX = null
      endTouchX = null;
      setAnimation('animation-right');
    }

    if (startTouchX! - endTouchX! > 0) {
      directionSwitch = 'next';
      startTouchX = null;
      endTouchX = null;
      setAnimation('animation-left');
    }
    switchCocktail(directionSwitch)

  }

  const handleAnimationEnd = () => {
    setAnimation('')
  }

  useEffect(() => {
    getCoctail(id);
  }, [id]);

  return (show &&
    <div className="modal__background" onClick={close} >
      <div
        className={`coctail__container ${animation}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onAnimationEnd={handleAnimationEnd}
      >
        <header>
          <h2>{currentCoctail.strDrink}</h2>
          <Button onClick={close} attr='close-modal'></Button>

        </header>
        <hr />
        <section className="coctail__top-info">
          <div className="coctail__image">
            <img src={currentCoctail.strDrinkThumb}
              alt={currentCoctail.strDrink} />
          </div>
          <div className="coctail__attr">
            {(currentCoctail.strAlcoholic == 'Non alcoholic') && <AlcoFreeLabel />}
            <p><b>Title:</b> {currentCoctail.strDrink}</p>
            <p><b>Category:</b> {currentCoctail.strCategory}</p>
            <p><b>IBA:</b> {currentCoctail.strIBA || 'Unspecified'}</p>
            <p><b>Glass:</b> {currentCoctail.strGlass}</p>
            <h4>Ingridients:</h4>
            {currentCoctail.strIngredient1 && <p><b>1:</b> {currentCoctail.strIngredient1}</p>}
            {currentCoctail.strIngredient2 && <p><b>2:</b> {currentCoctail.strIngredient2}</p>}
            {currentCoctail.strIngredient3 && <p><b>3:</b> {currentCoctail.strIngredient3}</p>}
            {currentCoctail.strIngredient4 && <p><b>4:</b> {currentCoctail.strIngredient4}</p>}
            {currentCoctail.strIngredient5 && <p><b>5:</b> {currentCoctail.strIngredient5}</p>}
            {currentCoctail.strIngredient6 && <p><b>6:</b> {currentCoctail.strIngredient6}</p>}
            {currentCoctail.strIngredient7 && <p><b>7:</b> {currentCoctail.strIngredient7}</p>}
            {currentCoctail.strIngredient8 && <p><b>8:</b> {currentCoctail.strIngredient8}</p>}
            {currentCoctail.strIngredient9 && <p><b>9:</b> {currentCoctail.strIngredient9}</p>}
            {currentCoctail.strIngredient10 && <p><b>10:</b> {currentCoctail.strIngredient10}</p>}
          </div>
        </section>
        <hr />
        <section className="coctail__description">
          <h4>Instructions:</h4>
          <p>{currentCoctail.strInstructions}</p>
        </section>
        <div className="modal__controls">
          <Button onClick={() => switchCocktail('prev')}>Previous</Button>

          <Button onClick={() => switchCocktail('next')}>Next</Button>
        </div>
      </div>

    </div>
  )
}