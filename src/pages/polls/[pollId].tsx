import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PollPage() {
  const router = useRouter();
  const { pollId } = router.query;
  const [poll, setPoll] = useState<any>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (pollId) {
      fetch(`/api/polls/${pollId}`)
        .then((res) => res.json())
        .then(setPoll);
      fetch(`/api/polls/${pollId}/results`)
        .then((res) => res.json())
        .then(setResults);
    }
  }, [pollId]);

  const vote = async () => {
    if (selected === null) return;
    const res = await fetch(`/api/polls/${pollId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ option: selected }),
    });
    if (res.ok) {
      setMessage("Vote submitted!");
      fetch(`/api/polls/${pollId}/results`)
        .then((res) => res.json())
        .then(setResults);
    } else {
      setMessage("Error submitting vote.");
    }
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div>
      <h2>{poll.question}</h2>
      <ul>
        {poll.options.map((opt: string, idx: number) => (
          <li key={idx}>
            <label>
              <input
                type="radio"
                name="option"
                checked={selected === idx}
                onChange={() => setSelected(idx)}
              />
              {opt}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={vote}>Vote</button>
      <div>{message}</div>
      <h3>Results</h3>
      {results && (
        <ul>
          {poll.options.map((opt: string, idx: number) => (
            <li key={idx}>
              {opt}: {results.votes[idx] || 0}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
