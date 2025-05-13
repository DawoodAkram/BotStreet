import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import HomeHeader from "@/components/homeheader";
import PollTemplate from "@/components/PollTemplate";
import Link from "next/link";

const PollPage = () => {
  const [polls, setPolls] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchPolls = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/polls");
      setPolls(res.data);
    } catch (err) {
      console.error("Failed to fetch polls:", err);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  // Optional: handle newPoll param to force refresh list
  useEffect(() => {
    const newPoll = searchParams.get("newPoll");
    if (newPoll) {
      fetchPolls(); // Refresh polls
      router.replace("/pollspage"); // Clean URL
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <HomeHeader />

      <div className="flex-1 flex flex-col items-center justify-start p-4 gap-6">
        {polls.length === 0 ? (
          <p className="text-gray-400">No polls available.</p>
        ) : (
          polls.map((poll) => (
            <PollTemplate key={poll.poll_id} poll={poll} />
          ))
        )}

        <Link
          href="/pollspage/create"
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Add Poll
        </Link>
      </div>
    </div>
  );
};

export default PollPage;
