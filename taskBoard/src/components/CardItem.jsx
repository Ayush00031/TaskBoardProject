import { useState } from "react";

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
export default CardItem;
