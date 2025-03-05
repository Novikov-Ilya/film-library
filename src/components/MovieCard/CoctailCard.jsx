import { useEffect, useState } from "react";
import fetchParams from '../../const/fetchparams';
import './coctailCard.scss';
import Button from "../Button/Button";

export default function CoctailCard({ id, show, close, switchCocktail }) {
  const [currentCoctail, setCurrentCoctail] = useState({});

  async function getCoctail(id) {

    const response = await fetch(`${fetchParams.coctailDetailsBuId}${id}`,
      {
        ...fetchParams.headers
      }
    );
    const coctailDetails = await response.json();
    setCurrentCoctail(coctailDetails.drinks[0]);
  }

  useEffect(() => {
    getCoctail(id);
  }, [id]);

  return (show &&
    <div className="modal__background">
      <section className="coctail__container">
        <h2>{currentCoctail.strDrink}</h2>
        <hr />
        <section className="coctail__top-info">
          <div className="coctail__image">
            <img src={currentCoctail.strDrinkThumb}
              alt={currentCoctail.strDrink} />
          </div>
          <div className="coctail__attr">
            <p><b>Title:</b> {currentCoctail.strDrink}</p>
            <p><b>Category:</b> {currentCoctail.strCategory}</p>
            <p><b>IBA:</b> {currentCoctail.strIBA || 'Unspecified'}</p>
            <p><b>Glass:</b> {currentCoctail.strGlass}</p>
          </div>
        </section>
        <hr />
        <section className="coctail__description">
          <h4>Instructions:</h4>
          <p>{currentCoctail.strInstructions}</p>
        </section>
        <div className="modal__controls">
          <Button onClick={switchCocktail}>Previous</Button>
          <Button onClick={close}>Close</Button>
          <Button onClick={switchCocktail}>Next</Button>
        </div>

      </section>

    </div>
  )
}