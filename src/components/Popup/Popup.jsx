import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Popup.css';

function Popup({
  className,
  chosenNFT,
  setCards,
  isPopupVisible,
  setPopupVisibility,
}) {
  const [isFormVisible, setFormVisibility] = useState(false);
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormVisible) {
      setCards((cards) =>
        cards.map((card) =>
          card.title === chosenNFT ? { ...card, isSold: true } : card
        )
      );
      setPopupVisibility(false);
    } else {
      setFormVisibility(true);
    }
  };

  const closePopup = (e) => {
    if (e.key === 'Escape') {
      setPopupVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closePopup);

    return () => {
      document.removeEventListener('keydown', closePopup);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFormVisibility(false);
      setTelephone('');
      setEmail('');
      setAddress('');
    }, 300);
  }, [isPopupVisible]);

  return (
    <div id="popup" className={`wrapper ${className}`}>
      <p id="popup__title">{`You want to purchase ${chosenNFT}?`}</p>
      <form id="popup__form" onSubmit={handleSubmit}>
        {isFormVisible && (
          <>
            <input
              className="popup__input"
              autoFocus
              type="text"
              value={telephone}
              placeholder="Telephone"
              onChange={(e) => setTelephone(e.target.value)}
            />
            <input
              className="popup__input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="popup__input"
              id="form__address"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </>
        )}
        <div id="popup__buttons">
          <button
            className="popup__button"
            disabled={isFormVisible && !(telephone && email && address)}
            type={isFormVisible ? 'submit' : 'button'}
            onClick={handleSubmit}
          >
            Yes
          </button>
          <button
            className="popup__button popup__button--cancel"
            onClick={() => setPopupVisibility(false)}
            type="button"
          >
            No
          </button>
        </div>
      </form>
    </div>
  );
}

Popup.propTypes = {
  className: PropTypes.string.isRequired,
  chosenNFT: PropTypes.string.isRequired,
  setCards: PropTypes.func.isRequired,
  isPopupVisible: PropTypes.bool.isRequired,
  setPopupVisibility: PropTypes.func.isRequired,
};

export default Popup;
