"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreatePollPage = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = async () => {
    const cleanedOptions = options.map((opt) => opt.trim()).filter(Boolean);
    if (!question.trim() || cleanedOptions.length < 2) {
      alert("Please enter a question and at least two valid options.");
      return;
    }

    const newPoll = {
      question: question.trim(),
      options: cleanedOptions,
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/polls/create", newPoll);
      router.push("/pollspage");
    } catch (error) {
      console.error("Failed to create poll:", error);
      alert("Something went wrong while creating the poll.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Create a New Poll</h1>

      <input
        type="text"
        placeholder="Enter your question"
        className="w-full max-w-xl p-2 mb-4 rounded bg-gray-800 border border-gray-700"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <div className="w-full max-w-xl">
        {options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            className="w-full p-2 mb-2 rounded bg-gray-800 border border-gray-700"
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
          />
        ))}
        <button
          onClick={handleAddOption}
          className="mb-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
        >
          + Add Option
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white disabled:bg-gray-500"
      >
        {loading ? "Creating..." : "Create Poll"}
      </button>
    </div>
  );
};

export default CreatePollPage;
