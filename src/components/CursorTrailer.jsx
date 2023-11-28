import React, { useState, useEffect } from "react";

function CursorTrailer() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const offset = 70;

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX + offset, y: e.clientY - offset });
    };

    document.addEventListener("mousemove", updateCursorPosition);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);
  return (
    <img
    className="cursor-trailer"
      src="./favicon.ico"
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        pointerEvents: "none", // Ensures the cursor trailer doesn't interfere with other elements
      }}
    />
  );
}

export default CursorTrailer;
