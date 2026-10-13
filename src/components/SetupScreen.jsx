import { useState } from "react";

const EXAMPLE_PROMPT =
  "You are Sarah, a friendly hiring manager interviewing the user for a frontend developer job. " +
  "Ask one question at a time and keep your answers short.";

export default function SetupScreen({ onStart }) {
  const [prompt, setPrompt] = useState(EXAMPLE_PROMPT);

  return (
    <div className="setup">
      <h1>AI Role Play</h1>
      <p>Describe who the AI should be:</p>

      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={8} />

      <button onClick={() => onStart(prompt)} disabled={!prompt.trim()}>
        Start Role Play
      </button>
    </div>
  );
}
