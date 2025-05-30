document.addEventListener("DOMContentLoaded", function () {
  const siteUrl = window.siteUrl;
  const sitePagesDir = window.sitePageDirectiory;
  const categoryName = window.categoryName;
  const newsOrder = window.newsOrder;
  const specificCategories = window.birthdayAnniversary;

  const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${sitePagesDir}')/items?$select=ID,Title,FileRef,Created,BannerImageUrl,Author/Title,${categoryName}&$expand=Author&$filter=PromotedState eq 2&$orderby=Created ${newsOrder}`;

  const specificSectionContainer = document.querySelector(".anniversary-list");
  const popupContainer = document.querySelector(".popup-container");

  async function fetchSpecificNews() {
    try {
      const response = await fetch(apiUrl, {
        headers: { Accept: "application/json;odata=verbose" },
      });
      const data = await response.json();

      // Filter news items belonging to specificCategories
      const filteredItems = data.d.results
        .map((item) => ({
          ID: item.ID,
          Title: item.Title,
          FileRef: item.FileRef,
          ThumbnailUrl: item.BannerImageUrl
            ? item.BannerImageUrl.Url
            : "./assets/img/update/default.png",
          Categories: item.Category
            ? item.Category.results || [item.Category]
            : [],
        }))
        .filter((item) =>
          item.Categories.some((cat) => specificCategories.includes(cat))
        );

      renderSpecificNews(filteredItems);
    } catch (error) {
      console.error("Error fetching specific news:", error);
    }
  }

  function renderSpecificNews(items) {
    specificSectionContainer.innerHTML = ""; // Clear any existing content

    items.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("anniversary-news-item");

      listItem.innerHTML = `
        <div class="anniversary-image">
          <img src="${item.ThumbnailUrl}" alt="Thumbnail" class="news-thumbnail" />
        </div>
        <h4 class="news-title">${item.Title}</h4>
      `;

      // Add click event to open popup with full thumbnail
      listItem.addEventListener("click", () =>
        openPopupWithId(item.ID, item.Title)
      );
      specificSectionContainer.appendChild(listItem);
    });
  }

  async function fetchNewsPostContentById(postId) {
    try {
      const response = await fetch(
        `${siteUrl}/_api/web/lists/getbytitle('${sitePagesDir}')/items(${postId})?$select=Title,CanvasContent1`,
        {
          headers: { Accept: "application/json;odata=verbose" },
        }
      );
      if (!response.ok) {
        console.error("Response Error:", await response.text());
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();

      const htmlContent = data.d.CanvasContent1;

      // Use DOMParser to extract the image from the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      const imageElements = doc.querySelectorAll("img");
      const imageElement =
        imageElements.length > 1
          ? imageElements[imageElements.length - 1]
          : null;
      const imageUrl = imageElement ? imageElement.src : null;

      return imageUrl;
    } catch (error) {
      console.error("Error fetching news post content by ID:", error);
      throw error;
    }
  }

  function openPopupWithId(postId, title) {
    // Fetch the full content of the news post using its ID
    fetchNewsPostContentById(postId).then((data) => {
      popupContainer.innerHTML = `
      <div class="popup-overlay"></div>
      <div class="popup-content">
        ${
          data
            ? `<img src="${data}" alt="${title}" class="popup-image" />`
            : `<p>No image found in this news post. Displaying full content below:</p>`
        }
        <span class="popup-close">✕</span>
      </div>
    `;

      // Show the popup
      popupContainer.classList.add("active");

      // Add close functionality
      const closeButton = popupContainer.querySelector(".popup-close");
      const overlay = popupContainer.querySelector(".popup-overlay");

      closeButton.addEventListener("click", closePopup);
      overlay.addEventListener("click", closePopup);
    });
  }

  function closePopup() {
    popupContainer.classList.remove("active");
  }

  fetchSpecificNews();
});
