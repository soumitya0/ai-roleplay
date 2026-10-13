import { AI_PHOTO } from "../vapi.js";

// Shows the AI's photo. Glows while the AI is talking.
export default function AIAvatar({ isSpeaking }) {
  return (
    <div className={isSpeaking ? "tile speaking" : "tile"}>
      <img src={AI_PHOTO} alt="AI" />
      <span className="name">AI</span>
    </div>
  );
}
