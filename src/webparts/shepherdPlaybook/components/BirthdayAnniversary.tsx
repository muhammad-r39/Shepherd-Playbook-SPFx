import React, { useState } from "react";
import { useBirthdayAnniversary } from "../hook/useBirthdayAnniversary";
import { Popup } from "./Popup";
import { config } from "../config";

export const BirthdayAnniversary: React.FC = () => {
  const { items, loading } = useBirthdayAnniversary();
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const [popupTitle, setPopupTitle] = useState<string>("");

  const handleClick = async (id: number, title: string) => {
    try {
      const res = await fetch(
        `${config.siteUrl}/_api/web/lists/getbytitle('${config.sitePageDirectory}')/items(${id})?$select=Title,CanvasContent1`,
        { headers: { Accept: "application/json;odata=verbose" } }
      );
      const data = await res.json();
      const html = data.d.CanvasContent1;
      const doc = new DOMParser().parseFromString(html, "text/html");
      const images = doc.querySelectorAll("img");
      const lastImage = images.length > 1 ? images[images.length - 1] : null;

      setPopupImage(lastImage?.src || "");
      setPopupTitle(title);
    } catch (err) {
      console.error("Error fetching full image:", err);
    }
  };

  return (
    <ul className="anniversary-list">
      {loading ? (
        <li>Loading...</li>
      ) : (
        items.map((item) => (
          <li
            key={item.ID}
            className="anniversary-news-item"
            onClick={() => handleClick(item.ID, item.Title)}
          >
            <div className="anniversary-image">
              <img
                src={item.ThumbnailUrl}
                alt={item.Title}
                className="news-thumbnail"
              />
            </div>
            <h4 className="news-title">{item.Title}</h4>
          </li>
        ))
      )}
      {popupImage && (
        <Popup
          image={popupImage}
          alt={popupTitle}
          onClose={() => setPopupImage(null)}
        />
      )}
    </ul>
  );
};
