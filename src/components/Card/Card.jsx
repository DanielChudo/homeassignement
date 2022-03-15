import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ src, title, price, isSold, setChosenNFT, setPopupVisibility }) {
  return (
    <div className={`card wrapper ${isSold ? 'visible' : ''}`}>
      <img src={src} alt={title} />
      <div className="card__info">
        <p>{title}</p>
        <p className="card__price">{price}$</p>
      </div>
      <button
        className="card__button"
        disabled={isSold}
        type="button"
        onClick={() => {
          setPopupVisibility(true);
          setChosenNFT(title);
        }}
      >
        Buy now!
      </button>
    </div>
  );
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isSold: PropTypes.bool.isRequired,
  setChosenNFT: PropTypes.func.isRequired,
  setPopupVisibility: PropTypes.func.isRequired,
};

export default Card;
