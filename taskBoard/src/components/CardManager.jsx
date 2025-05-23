import { useState } from "react";
import CardAdd from "./CardAdd";
import CardItem from "./CardItem";

const CardManager = () => {
  // State to store all cards
  const [cards, setCards] = useState([]);

  // Add a new card
  const addCard = (text) => {
    const newCard = {
      id: Date.now(),
      text,
    };
    setCards([...cards, newCard]);
  };

  // Delete card by id
  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  // Update card text by id
  const updateCard = (id, newText) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, text: newText } : card))
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-zinc-900 rounded-md text-white">
      <CardAdd getcard={addCard} />
      <div className="mt-4 space-y-3">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            deleteCard={deleteCard}
            updateCard={updateCard}
          />
        ))}
      </div>
    </div>
  );
};
export default CardManager;
