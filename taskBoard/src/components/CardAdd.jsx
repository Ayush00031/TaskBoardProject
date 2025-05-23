import React, { useState } from "react";
import { X, Plus } from "react-feather";

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

export default CardAdd;
