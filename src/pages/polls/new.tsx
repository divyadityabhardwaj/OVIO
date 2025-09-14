import { useState } from "react";

export default function NewPoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [message, setMessage] = useState("");

  const handleOptionChange = (idx: number, value: string) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, options }),
    });
    if (res.ok) {
      setMessage("Poll created!");
    } else {
      setMessage("Error creating poll.");
    }
  };

  return (
    <div>
      <h2>Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Poll question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((opt, idx) => (
          <input
            key={idx}
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
          />
        ))}
        <button type="button" onClick={addOption}>
          Add Option
        </button>
        <button type="submit">Create Poll</button>
      </form>
      <div>{message}</div>
    </div>
  );
}
