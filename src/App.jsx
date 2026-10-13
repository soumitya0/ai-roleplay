import { useState } from "react";
import SetupScreen from "./components/SetupScreen.jsx";
import CallScreen from "./components/CallScreen.jsx";

// Two screens: write a prompt -> talk to the AI.
export default function App() {
  const [systemPrompt, setSystemPrompt] = useState("");

  if (!systemPrompt) {
    return <SetupScreen onStart={setSystemPrompt} />;
  }

  return <CallScreen systemPrompt={systemPrompt} onLeave={() => setSystemPrompt("")} />;
}
