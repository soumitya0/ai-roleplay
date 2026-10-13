# AI Role Play

Write a system prompt, then talk to an AI character by voice (Vapi) while your camera is on.

## Demo
⬇️ [download the demo video](docs/demo.mp4)

## Run it

1. `npm install`
2. Copy `.env.example` to `.env` and paste your Vapi **public** key
3. `npm run dev` and open the link

## Files

- `src/vapi.js` – Vapi setup, AI photo, and the call settings (model, voice, first message)
- `src/App.jsx` – switches between the two screens
- `src/components/SetupScreen.jsx` – type the system prompt
- `src/components/CallScreen.jsx` – the call: camera, AI photo, transcript
- `src/components/UserCamera.jsx` – your webcam
- `src/components/AIAvatar.jsx` – the AI photo (green border while it talks)
