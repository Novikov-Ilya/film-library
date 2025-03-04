import { useEffect, useRef, useState } from "react";
import fetchParams from '../../const/fetchparams';
import './coctailCard.scss';
import Button from "../Button/Button";

export default function CoctailCard({ id, show, close }) {
  const [currentCoctail, setCurrentCoctail] = useState({});

  const coctailModal = useRef();

  async function getCoctail(id) {

    const response = await fetch(`${fetchParams.coctailDetailsBuId}${id}`, { ...fetchParams.headers });
    const coctailDetails = await response.json();
    setCurrentCoctail(coctailDetails.drinks[0]);
  }
  useEffect(() => {
    if (show) {
      coctailModal.current.showModal();
    } else {
      coctailModal.current.close();
    }
    getCoctail(id);
  }, [id, show]);

  return (
      <dialog ref={coctailModal}>
        <div className="coctail__container">
          <div className="coctail__top-info">
            <div className="coctail__image">
              <img src={currentCoctail.strDrinkThumb}
                alt={currentCoctail.strDrink} />
            </div>
            <div className="coctail__attr">
              <p>Title: {currentCoctail.strDrink}</p>


            </div>
          </div>
          <div className="coctail__description">
            <p>{currentCoctail.strInstructions}</p>
          </div>
        </div>
        <Button onClick={close}>Close</Button>
      </dialog>
    )
}