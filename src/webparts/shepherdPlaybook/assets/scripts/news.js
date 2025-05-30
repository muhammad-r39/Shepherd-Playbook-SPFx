document.addEventListener("DOMContentLoaded", function () {
  const siteUrl = window.siteUrl;
  const sitePagesDir = window.sitePageDirectiory;
  const categoryName = window.categoryName;
  const newsOrder = window.newsOrder;
  const excludeCategories = window.excludeFromMainNews;

  const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${sitePagesDir}')/items?$select=Title,FileRef,Created,BannerImageUrl,Author/Title,${categoryName}&$expand=Author&$filter=PromotedState eq 2&$orderby=Created ${newsOrder}`;

  const newsContainer = document.querySelector(".news-posts");
  const categoryContainer = document.querySelector(".news-category ul");
  const paginationContainer = document.querySelector(".news-pagination");

  // window.pageCategories can be defined on a per‐page basis.
  const pageCategories = window.pageCategories || [];
  const breakpoint = 767;
  let itemsPerPage = window.innerWidth <= breakpoint ? 2 : 2;
  let maxPagesToShow = window.innerWidth <= breakpoint ? 5 : 10;
  let currentPage = 1;
  let newsData = [];
  let allNewsData = [];
  let categories = new Set();

  async function fetchNews() {
    try {
      const response = await fetch(apiUrl, {
        headers: { Accept: "application/json;odata=verbose" },
      });
      const data = await response.json();

      // Map each item and correctly extract category strings.
      let newsItems = data.d.results.map((item) => {
        let cats = [];
        if (item.Category) {
          if (item.Category.results) {
            cats = item.Category.results;
          } else if (typeof item.Category === "string") {
            cats = [item.Category];
          }
        }
        return {
          ...item,
          Categories: cats,
        };
      });

      // Exclude items belonging to excludeCategories
      newsItems = newsItems.filter(
        (item) =>
          !item.Categories.some((cat) => excludeCategories.includes(cat))
      );

      // If pageCategories are defined (for category-specific pages),
      // filter the news items accordingly.
      if (pageCategories.length) {
        newsItems = newsItems.filter((item) =>
          item.Categories.some((cat) => pageCategories.includes(cat))
        );
      }

      // Store the full (filtered) list.
      allNewsData = newsItems;
      newsData = newsItems;

      // Collect unique categories from the full list.
      categories.clear(); // Reset categories before adding new ones

      newsItems.forEach((item) => {
        item.Categories.forEach((cat) => {
          if (pageCategories.length === 0 || pageCategories.includes(cat)) {
            categories.add(cat);
          }
        });
      });

      renderNews();
      setupCategories();
      setupCategoryScrolling();
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  function renderNews() {
    newsContainer.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedItems = newsData.slice(start, start + itemsPerPage);

    paginatedItems.forEach((item) => {
      const newsCard = document.createElement("div");
      newsCard.classList.add("news-card");

      newsCard.innerHTML = `
        <div class="featured-image">
          <a class="post-title" href="${item.FileRef}">
            <img src="${
              item.BannerImageUrl
                ? item.BannerImageUrl.Url
                : "./assets/img/update/default.png"
            }" alt="Featured Image" />
          </a>
        </div>
        <div class="post-meta">
          <h4 class="author">${
            item.Author ? item.Author.Title : "Unknown Author"
          }</h4>
          <span class="post-date">${new Date(
            item.Created
          ).toDateString()}</span>
        </div>
        <a class="post-title" href="${item.FileRef}">
          <h3>${item.Title}</h3>
        </a>
      `;
      newsContainer.appendChild(newsCard);
    });

    updatePagination();
  }

  function setupCategories() {
    if (!categoryContainer) return;
    categoryContainer.innerHTML = "";

    // Extract category names from our set (they should be strings now)
    const uniqueCategories = ["All News", ...new Set([...categories])];

    uniqueCategories.forEach((category, index) => {
      const button = document.createElement("button");
      button.innerText = category;
      if (index === 0) button.classList.add("active"); // Set "All News" as active initially

      button.addEventListener("click", () => filterNews(category));

      const list = document.createElement("li");
      list.appendChild(button);
      categoryContainer.appendChild(list);
    });
  }

  function setupCategoryScrolling() {
    const categoryWrapper = document.querySelector(".news-category");
    const categoryList = categoryWrapper.querySelector("ul");
    const prevBtn = categoryWrapper.querySelector(".prev");
    const nextBtn = categoryWrapper.querySelector(".next");

    function updateButtons() {
      // Check if scrolling is needed
      if (categoryList.scrollWidth > categoryWrapper.clientWidth) {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      } else {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      }
    }

    function scrollLeft() {
      categoryList.scrollBy({ left: -200, behavior: "smooth" });
    }

    function scrollRight() {
      categoryList.scrollBy({ left: 200, behavior: "smooth" });
    }

    prevBtn.addEventListener("click", scrollLeft);
    nextBtn.addEventListener("click", scrollRight);
    window.addEventListener("resize", updateButtons);

    updateButtons(); // Initial check
  }

  function filterNews(selectedCategory) {
    // Reset pagination to page 1 on filter change.
    currentPage = 1;

    // Remove active class from all buttons
    document.querySelectorAll(".news-category button").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Set the clicked button as active
    const activeButton = [
      ...document.querySelectorAll(".news-category button"),
    ].find((btn) => btn.innerText === selectedCategory);
    if (activeButton) activeButton.classList.add("active");

    if (selectedCategory === "All News") {
      newsData = allNewsData;
    } else {
      // Filter using the original full list.
      newsData = allNewsData.filter((item) =>
        item.Categories.includes(selectedCategory)
      );
    }

    renderNews();
  }

  function updatePagination() {
    const totalPages = Math.ceil(newsData.length / itemsPerPage);
    paginationContainer.innerHTML = "";

    if (totalPages > 1) {
      // Previous button
      const prevButton = document.createElement("button");
      prevButton.innerText = "<";
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderNews();
        }
      });
      paginationContainer.appendChild(prevButton);

      // Determine the range of pages to display.
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement("button");
        pageButton.innerText = i;
        if (i === currentPage) pageButton.classList.add("active");
        pageButton.addEventListener("click", () => {
          currentPage = i;
          renderNews();
        });
        paginationContainer.appendChild(pageButton);
      }

      // Next button
      const nextButton = document.createElement("button");
      nextButton.innerText = ">";
      nextButton.disabled = currentPage === totalPages;
      nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderNews();
        }
      });
      paginationContainer.appendChild(nextButton);
    }
  }

  window.addEventListener("resize", () => {
    itemsPerPage = window.innerWidth <= breakpoint ? 2 : 2;
    maxPagesToShow = window.innerWidth <= breakpoint ? 5 : 10;
    renderNews();
  });

  fetchNews();
});
