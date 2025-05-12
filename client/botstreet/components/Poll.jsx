import { useState } from "react";

const Poll = ({ question, options, onVote }) => {
  const [selected, setSelected] = useState(null);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (selected !== null) {
      onVote(selected);
      setVoted(true);
    }
  };

  return (
    <div className="bg-gray-700 text-gray-100 p-6 rounded-2xl shadow-xl max-w-lg w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">{question}</h2>
      <div className="space-y-3">
        {options.map((option, index) => (
          <label
            key={index}
            className={`block cursor-pointer border rounded-xl px-4 py-2 transition 
            ${selected === index
                ? "border-blue-600 bg-blue-400"
                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
              }`}
          >
            <input
              type="radio"
              name="pollOption"
              className="hidden"
              checked={selected === index}
              onChange={() => setSelected(index)}
              disabled={voted}
            />
            {option}
          </label>
        ))}
      </div>

      <button
        className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded-xl transition hover:bg-blue-700 disabled:bg-gray-300"
        onClick={handleVote}
        disabled={voted || selected === null}
      >
        {voted ? "Thanks for voting!" : "Submit Vote"}
      </button>
    </div>
  );
};

export default Poll;
