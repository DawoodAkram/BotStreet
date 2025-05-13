import { useState } from "react";
import axios from "axios";

const PollTemplate = ({ poll }) => {
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    if (!selectedOptionId) return;

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/polls/vote", {
        option_id: selectedOptionId,
      });
      setVoted(true);
    } catch (err) {
      console.error("Vote failed:", err);
      alert("Something went wrong while voting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 text-gray-100 p-6 rounded-2xl shadow-xl max-w-lg w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">{poll.question}</h2>

      <div className="space-y-3">
        {poll.options.map((option) => (
          <label
            key={option.option_id}
            className={`block cursor-pointer border rounded-xl px-4 py-2 transition 
              ${selectedOptionId === option.option_id
                ? "border-blue-600 bg-blue-400"
                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
              }`}
          >
            <input
              type="radio"
              name="pollOption"
              className="hidden"
              checked={selectedOptionId === option.option_id}
              onChange={() => setSelectedOptionId(option.option_id)}
              disabled={voted}
            />
            {option.option_text}
          </label>
        ))}
      </div>

      <button
        className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded-xl transition hover:bg-blue-700 disabled:bg-gray-400"
        onClick={handleVote}
        disabled={voted || selectedOptionId === null || loading}
      >
        {voted ? "Thanks for voting!" : loading ? "Submitting..." : "Submit Vote"}
      </button>
    </div>
  );
};

export default PollTemplate;
