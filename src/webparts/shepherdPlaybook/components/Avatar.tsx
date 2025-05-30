import React, { useEffect, useState } from "react";
import {
  getInitials,
  getRandomColor,
  verifyImageUrl,
} from "../utils/avatarUtils";

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  imageUrl,
  size = 48,
}) => {
  const [validImage, setValidImage] = useState<boolean>(false);

  useEffect(() => {
    if (imageUrl) {
      verifyImageUrl(imageUrl).then(setValidImage);
    }
  }, [imageUrl]);

  if (imageUrl && validImage) {
    return (
      <img
        src={imageUrl}
        alt={name}
        style={{ width: size, height: size, borderRadius: "50%" }}
      />
    );
  }

  const initials = getInitials(name);
  const bgColor = getRandomColor();

  return (
    <div
      title={name}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: bgColor,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size / 2,
        fontWeight: "bold",
      }}
    >
      {initials}
    </div>
  );
};
