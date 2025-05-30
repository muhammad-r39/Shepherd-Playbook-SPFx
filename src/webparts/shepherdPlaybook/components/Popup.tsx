import React from "react";
import "./Popup.css";

interface PopupProps {
  image: string;
  alt: string;
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({ image, alt, onClose }) => {
  return (
    <div className="popup-container active">
      <div className="popup-overlay" onClick={onClose}></div>
      <div className="popup-content">
        {image ? (
          <img src={image} alt={alt} className="popup-image" />
        ) : (
          <p>No image found in this news post.</p>
        )}
        <span className="popup-close" onClick={onClose}>
          ✕
        </span>
      </div>
    </div>
  );
};
