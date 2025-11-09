import React, { useEffect, useState } from "react";

export default function FullscreenPopup({ show, onClose, children }) {
  const [visible, setVisible] = useState(false);

  // handle mount/unmount animation
  useEffect(() => {
    if (show) setVisible(true);
  }, [show]);

  const handleAnimationEnd = () => {
    if (!show) setVisible(false);
  };

  if (!visible && !show) return null;

  return (
    <div
      style={{
        ...overlayStyle,
        animation: `${show ? "fadeIn" : "fadeOut"} 0.25s ease`,
      }}
      onClick={onClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        style={{
          ...popupStyle,
          animation: `${show ? "zoomIn" : "zoomOut"} 0.25s ease`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

// ---------- Styles ----------
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const popupStyle = {
  background: "black",
  borderRadius: "8px",
  padding: "20px 30px",
  maxWidth: "500px",
  width: "80%",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  textAlign: "center",
};

// inject CSS keyframes once
if (typeof document !== "undefined" && !document.getElementById("popup-animations")) {
  const styleTag = document.createElement("style");
  styleTag.id = "popup-animations";
  styleTag.textContent = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes zoomIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes zoomOut {
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.9); opacity: 0; }
}
`;
  document.head.appendChild(styleTag);
}
