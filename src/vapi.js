import VapiModule from "@vapi-ai/web";

const Vapi = VapiModule.default || VapiModule;

const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

// The picture shown for the AI character. Swap it for any image URL you like.
export const AI_PHOTO = "https://i.pravatar.cc/400?img=20";

// Lets the AI hang up the call, but only after the user says goodbye.
// The rejectionPlan blocks the hang-up when the user's last message has no "bye".
const END_CALL_TOOL = {
  type: "endCall",
  rejectionPlan: {
    conditions: [
      {
        type: "regex",
        regex: "(?i)\\b(bye|goodbye|see you|take care)\\b",
        target: { role: "user", position: -1 }, // the user's last message
        negate: true, // reject when it does NOT match
      },
    ],
  },
};

// Start a voice call where the AI follows your system prompt.
export async function startRolePlay(systemPrompt) {
  try {
    await vapi.start({
      firstMessage: "Hi! Ready when you are.",
      model: {
        provider: "openai",
        model: "gpt-4o",
        messages: [{ role: "system", content: systemPrompt }],
        tools: [END_CALL_TOOL],
      },
      voice: {
        provider: "11labs",
        voiceId: "21m00Tcm4TlvDq8ikWAM", // "Rachel", from the Vapi docs example
      },
    });
  } catch (error) {
    console.error("Vapi could not start the call:", error);
  }
}

export function stopRolePlay() {
  vapi.stop();
}

export default vapi;
