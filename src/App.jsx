import React, { useState, useEffect } from 'react';
import './App.css';
import { Popup, Card } from './components';

function App() {
  const [cards, setCards] = useState(null);
  const [chosenNFT, setChosenNFT] = useState('');
  const [isPopupVisible, setPopupVisibility] = useState(false);

  useEffect(async () => {
    const response = await fetch('/data.json');
    if (response.ok) {
      setCards(await response.json());
    } else {
      console.log('An error has occurred. Data not received.');
    }
  }, []);

  return (
    <>
      <h1>Explore Collections</h1>
      <div id="base">
        {cards &&
          cards.map((card) => (
            <Card
              key={card.id}
              src={card.src}
              title={card.title}
              price={card.price}
              isSold={card.isSold}
              setChosenNFT={setChosenNFT}
              setPopupVisibility={setPopupVisibility}
            />
          ))}
        <div
          id="overlay"
          className={(isPopupVisible && 'visible') || ''}
          onClick={() => setPopupVisibility(false)}
        />
        <Popup
          className={(isPopupVisible && 'visible') || ''}
          chosenNFT={chosenNFT}
          setCards={setCards}
          isPopupVisible={isPopupVisible}
          setPopupVisibility={setPopupVisibility}
        />
      </div>
    </>
  );
}

export default App;
