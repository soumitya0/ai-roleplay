import { useEffect, useRef } from "react";

// Shows the user's webcam.
export default function UserCamera() {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream;

    navigator.mediaDevices.getUserMedia({ video: true }).then((s) => {
      stream = s;
      videoRef.current.srcObject = s;
    });

    // Turn the camera off when we leave the screen.
    return () => stream?.getTracks().forEach((track) => track.stop());
  }, []);

  return (
    <div className="tile">
      <video ref={videoRef} autoPlay muted playsInline />
      <span className="name">You</span>
    </div>
  );
}
