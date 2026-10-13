import { useEffect, useState } from "react";
import vapi, { startRolePlay, stopRolePlay } from "../vapi.js";
import UserCamera from "./UserCamera.jsx";
import AIAvatar from "./AIAvatar.jsx";

// Screen 2: your camera + the AI photo, talking over a Vapi voice call.
export default function CallScreen({ systemPrompt, onLeave }) {
  const [status, setStatus] = useState("Connecting...");
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    vapi.on("call-start", () => {
      console.log("Call started");
      setStatus("Connected - say hello!");
    });
    vapi.on("call-end", () => {
      console.log("Call ended");
      setStatus("Call ended");
    });
    vapi.on("speech-start", () => setAiSpeaking(true));
    vapi.on("speech-end", () => setAiSpeaking(false));
    vapi.on("error", (error) => {
      console.error("Vapi error:", error);
      setStatus("Something went wrong (see console)");
    });

    // Save each finished sentence so we can show a transcript.
    vapi.on("message", (msg) => {
      if (msg.type === "transcript" && msg.transcriptType === "final") {
        console.log(`${msg.role}: ${msg.transcript}`);
        setMessages((old) => [...old, { role: msg.role, text: msg.transcript }]);
      }
    });

    startRolePlay(systemPrompt);

    // Clean up when leaving the screen.
    return () => {
      stopRolePlay();
      vapi.removeAllListeners();
    };
  }, [systemPrompt]);

  return (
    <div className="call">
      <p className="status">{status}</p>

      <div className="tiles">
        <UserCamera />
        <AIAvatar isSpeaking={aiSpeaking} />
      </div>

      <div className="transcript">
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.role === "user" ? "You" : "AI"}:</b> {m.text}
          </p>
        ))}
      </div>

      <button className="end" onClick={onLeave}>
        End Call
      </button>
    </div>
  );
}
