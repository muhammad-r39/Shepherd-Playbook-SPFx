import * as React from "react";
import { useEffect, useState } from "react";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { config } from "../config";

export interface INewsCarouselProps {
  excludeCategories?: string[];
  pageCategories?: string[];
  order?: "asc" | "desc";
  spHttpClient: SPHttpClient;
}

const siteUrl = config.siteUrl;
const sitePageDirectiory = config.sitePageDirectory;
const categoryName = config.categoryName;
const excludeFromMainNews = new Set<string>(config.excludeFromMainNews);

// === Pagination Helper ===
const getItemsPerPage = (): number => (window.innerWidth <= 767 ? 2 : 2);
const getMaxPagesToShow = (): number => (window.innerWidth <= 767 ? 5 : 10);

export const NewsCarousel: React.FC<INewsCarouselProps> = ({
  excludeCategories = [],
  pageCategories = [],
  order = "asc",
  spHttpClient,
}) => {
  const [newsItems, setNewsItems] = useState([]);
  const [initialNewsData, setInitialNewsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All News");

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        // === Fetch News Items ===
        const url = `${siteUrl}/_api/web/lists/getbytitle('${sitePageDirectiory}')/items?$select=Title,FileRef,Created,BannerImageUrl,Author/Title,${categoryName}&$expand=Author&$filter=PromotedState eq 2&$orderby=Created ${order}`;

        const response: SPHttpClientResponse = await spHttpClient.get(
          url,
          SPHttpClient.configurations.v1
        );

        const dataJson = await response.json();
        const dataValue = dataJson.value;

        // === Display Initial News and Filter ===
        let news = [];

        // Exclude items belonging to excludeCategories
        const excludeSet = new Set<string>(excludeCategories);
        news = dataValue.filter(
          (item: any) =>
            !item.Category.some(
              (cat: string) =>
                excludeSet.has(cat) || excludeFromMainNews.has(cat)
            )
        );

        // If pageCategories are defined (for category-specific pages),
        // filter the news items accordingly.
        const includeSet = new Set<string>(pageCategories);
        if (pageCategories.length) {
          news = news.filter((item: any) =>
            item.Category.some((cat: string) => includeSet.has(cat))
          );
        }

        // Store the full (filtered) list
        setNewsItems(news);
        setInitialNewsData(news);

        let categories = new Set<string>();
        // Collect unique categories from the full list.
        // Reset categories before adding new ones
        categories.clear();

        news.forEach((item: any) => {
          item.Category.forEach((cat: string) => {
            categories.add(cat);
          });
        });

        setUniqueCategories(["All News", ...Array.from(categories)]);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    console.log("ran");
    fetchNewsItems();
  }, [spHttpClient]);

  const handleNewsFilter = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);

    if (category === "All News") {
      setNewsItems(initialNewsData);
    } else {
      setNewsItems(
        initialNewsData.filter((item: any) => item.Category.includes(category))
      );
    }
  };

  // === Horizontal Scroll ===
  const categoryWrapperRef = React.useRef<HTMLDivElement>(null);
  const categoryListRef = React.useRef<HTMLUListElement>(null);
  const prevBtnRef = React.useRef<HTMLButtonElement>(null);
  const nextBtnRef = React.useRef<HTMLButtonElement>(null);

  const scrollCategoryLeft = () => {
    if (categoryListRef.current) {
      categoryListRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollCategoryRight = () => {
    if (categoryListRef.current) {
      categoryListRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const updateScrollButtons = () => {
    const wrapper = categoryWrapperRef.current;
    const list = categoryListRef.current;
    if (!wrapper || !list || !prevBtnRef.current || !nextBtnRef.current) return;

    const isScrollable = list.scrollWidth > wrapper.clientWidth;
    prevBtnRef.current.style.display = isScrollable ? "block" : "none";
    nextBtnRef.current.style.display = isScrollable ? "block" : "none";
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [uniqueCategories]);

  // === News Pagination ===
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage());
  const [maxPagesToShow, setMaxPagesToShow] = useState<number>(
    getMaxPagesToShow()
  );

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setMaxPagesToShow(getMaxPagesToShow());
      setCurrentPage(1); // Reset to first page when layout changes
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === Display Loading ===
  if (loading) {
    return <div>Loading news...</div>;
  }

  return (
    <div className="news-carousel">
      <div className="news-category" ref={categoryWrapperRef}>
        {uniqueCategories.length > 0 && (
          <ul ref={categoryListRef}>
            {uniqueCategories.map((category) => (
              <li key={category}>
                <button
                  className={
                    category.toLowerCase() === activeCategory.toLowerCase()
                      ? "active"
                      : ""
                  }
                  onClick={() => handleNewsFilter(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          className="btn-scroll prev"
          onClick={scrollCategoryLeft}
          ref={prevBtnRef}
        >
          <img src={require("../assets/img/arrow-next.png")} alt="prev" />
        </button>
        <button
          className="btn-scroll next"
          onClick={scrollCategoryRight}
          ref={nextBtnRef}
        >
          <img src={require("../assets/img/arrow-next.png")} alt="next" />
        </button>
      </div>
      <div className="news-posts">
        {newsItems
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((item: any) => (
            <div className="news-card">
              <div className="featured-image">
                <a className="post-title" href={item.FileRef}>
                  <img
                    src={
                      item.BannerImageUrl
                        ? item.BannerImageUrl.Url
                        : "../assets/img/update/default.png"
                    }
                    alt="Featured Image"
                  />
                </a>
              </div>
              <div className="post-meta">
                <h4 className="author">
                  {item.Author ? item.Author.Title : "Unknown Author"}
                </h4>
                <span className="post-date">
                  {new Date(item.Created).toDateString()}
                </span>
              </div>
              <a className="post-title" href={item.FileRef}>
                <h3>{item.Title}</h3>
              </a>
            </div>
          ))}
      </div>
      <div className="news-pagination">
        {(() => {
          const totalPages = Math.ceil(newsItems.length / itemsPerPage);
          const buttons = [];

          if (totalPages > 1) {
            // Prev
            buttons.push(
              <button
                key="prev"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                {"<"}
              </button>
            );

            // Page range
            const startPage = Math.max(
              1,
              currentPage - Math.floor(maxPagesToShow / 2)
            );
            const endPage = Math.min(
              totalPages,
              startPage + maxPagesToShow - 1
            );

            for (let i = startPage; i <= endPage; i++) {
              buttons.push(
                <button
                  key={i}
                  className={i === currentPage ? "active" : ""}
                  onClick={() => setCurrentPage(i)}
                >
                  {i}
                </button>
              );
            }

            // Next
            buttons.push(
              <button
                key="next"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                {">"}
              </button>
            );
          }

          return buttons;
        })()}
      </div>
    </div>
  );
};
