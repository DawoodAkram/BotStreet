"use client";
import Poll from "@/components/Poll";

const PollTestPage = () => {
  const handleVote = (index) => {
    console.log(`Voted for option: ${index}`);
    // You could call an API or store the vote in state
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <Poll
        question="Which feature should we prioritize next?"
        options={["Dark Mode", "Real-time Chat", "Poll System", "Leaderboards"]}
        onVote={handleVote}
      />
    </div>
  );
};

export default PollTestPage;
