import React, { useState } from "react";
import { X, Plus, Edit, Check, Trash2 } from "react-feather";

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

const CardAdd = ({ getcard }) => {
  const [card, setCard] = useState("");
  const [show, setShow] = useState(false);

  const saveCard = () => {
    if (!card.trim()) return;
    getcard(card.trim());
    setCard("");
    setShow(false);
  };

  const closeBtn = () => {
    setCard("");
    setShow(false);
  };

  return (
    <div>
      {show ? (
        <div>
          <textarea
            value={card}
            onChange={(e) => setCard(e.target.value)}
            className="p-2 w-full rounded-md border-2 bg-zinc-700 border-zinc-900 resize-none"
            rows="2"
            placeholder="Enter Card Title..."
          />
          <div className="flex p-1 mt-2">
            <button
              onClick={saveCard}
              className="p-2 rounded bg-sky-600 text-white mr-2"
            >
              Add Card
            </button>
            <button
              onClick={closeBtn}
              className="p-2 rounded hover:bg-gray-600"
              aria-label="Cancel adding card"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShow(true)}
          className="flex p-2 w-full justify-start rounded items-center mt-1 hover:bg-gray-500 h-10"
        >
          <Plus size={16} className="mr-1" /> Add a card
        </button>
      )}
    </div>
  );
};

const CardItem = ({ card, deleteCard, updateCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(card.text);

  const saveUpdate = () => {
    if (!editText.trim()) return;
    updateCard(card.id, editText.trim());
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(card.text);
    setIsEditing(false);
  };

  return (
    <div className="p-3 border rounded bg-zinc-800 flex items-center justify-between">
      {isEditing ? (
        <>
          <textarea
            className="p-2 rounded-md bg-zinc-700 border border-zinc-600 w-full mr-2 resize-none"
            rows={2}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button
            onClick={saveUpdate}
            className="p-2 text-green-400 hover:text-green-600"
            aria-label="Save changes"
          >
            <Check size={20} />
          </button>
          <button
            onClick={cancelEdit}
            className="p-2 text-gray-400 hover:text-gray-600"
            aria-label="Cancel editing"
          >
            <X size={20} />
          </button>
        </>
      ) : (
        <>
          <div className="flex-grow whitespace-pre-wrap">{card.text}</div>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-400 hover:text-blue-600 mr-2"
            aria-label="Edit card"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => deleteCard(card.id)}
            className="p-2 text-red-400 hover:text-red-600"
            aria-label="Delete card"
          >
            <Trash2 size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default CardManager;
