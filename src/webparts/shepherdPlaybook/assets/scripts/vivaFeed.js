const CACHE_KEY = "vivaFeedCache";

// Separate function to fetch from server (to be used in background update)
async function fetchVivaFeedFromServer() {
  const functionUrl = `${window.serverUrl}/api/${window.httpTriggerName}?code=${window.defaultKey}`;
  const userToken = await getUserToken();

  const response = await fetch(functionUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch Viva feed");
  }
}

async function fetchVivaFeed() {
  // Check for cached data
  const cachedDataString = localStorage.getItem(CACHE_KEY);

  try {
    // If no cached data, fetch from server
    if (!cachedDataString) {
      console.log("No cached data, fetching from server");
      const freshData = await fetchVivaFeedFromServer();

      // Store in cache
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: freshData,
          timestamp: new Date().getTime(),
        })
      );

      return freshData;
    }

    // Parse cached data
    const { data: cachedData, timestamp } = JSON.parse(cachedDataString);

    // Check if cache is stale
    if (isCacheStale(timestamp)) {
      console.log("Cached data is stale, fetching from server");
      const freshData = await fetchVivaFeedFromServer();

      // Store fresh data in cache
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: freshData,
          timestamp: new Date().getTime(),
        })
      );

      return freshData;
    }

    // Cache is fresh - trigger background update
    backgroundUpdateCache();

    // Return cached data immediately
    console.log("Using cached data");
    return cachedData;
  } catch (error) {
    console.error("Feed fetch error:", error);

    // Fallback to cached data if available
    if (cachedDataString) {
      const { data: cachedData } = JSON.parse(cachedDataString);
      return cachedData;
    }

    // If no cached data and fetch fails
    return {};
  }
}

const postsPerPageDesktop = 3;
const postsPerPageMobile = 1;

let currentPage = 1;

let vivaFeed = {};

async function renderFeed() {
  const postsContainer = document.querySelector(".social-posts");
  const paginationContainer = document.querySelector(".sp-paginate");
  if (Object.keys(vivaFeed).length === 0) {
    postsContainer.innerHTML = "Loading...";
    vivaFeed = await fetchVivaFeed();
  }

  const feeds = vivaFeed.messages;

  // Filter out Comments and alike
  const filteredFeeds = vivaFeed.messages.filter((feed) => {
    return (
      feed.message_type != "update" ||
      (feed.message_type === "update" && feed.replied_to_id === null)
    );
  });

  const users = vivaFeed.references.filter((obj) => obj.type === "user");
  const groups = vivaFeed.references.filter((obj) => obj.type === "group");

  // Determine posts per page based on screen size
  const postsPerPage =
    window.innerWidth <= 768 ? postsPerPageMobile : postsPerPageDesktop;

  // Clear existing content
  postsContainer.innerHTML = "";
  paginationContainer.innerHTML = "";

  // Calculate start and end index based on the current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, feeds.length);

  // Add posts to the container
  filteredFeeds.slice(startIndex, endIndex).forEach((feed) => {
    const author = users.filter((obj) => obj.id === feed.sender_id)[0];

    const group = groups.filter((obj) => obj.id === feed.group_id)[0];

    const post = document.createElement("a");
    post.classList.add("post-link");
    post.setAttribute("href", feed.web_url);
    post.setAttribute("target", "_blank");

    const praise = feed.attachments.filter((obj) => obj.type === "praise");
    const sharedMessage = feed.attachments.filter(
      (obj) => obj.type === "shared_message"
    );

    let content = `
      <div class="post-top">
        ${
          feed.shared_message_id != null || feed.group_id == null
            ? `Shared on <b>Storyline</b>`
            : `Posted in <b>${group ? group.full_name : ""}</b>`
        }
      </div>
      <div class="post-header">
        <img src="${author.mugshot_url}" alt="User" class="post-avatar" />
        <div class="author-meta">
          <h4>${author.full_name}</h4>
          <span class="time">${new Date(
            feed.published_at
          ).toDateString()}</span>
        </div>
      </div>
      <div class="post-content"
      ${
        feed.message_type != "update"
          ? `post-highlight="${feed.message_type}"`
          : ""
      }
      ${praise.length > 0 ? `post-highlight="praise"` : ""}>
        ${feed.message_type === "question" ? `<h4>${feed.title}</h4>` : ""}
        <div class="description
        ${feed.message_type === "question" ? `question-details` : ""}">
          ${feed.body.rich}
    `;

    if (feed.message_type === "poll") {
      content += '<div class="poll-options">';
      feed.poll_options.forEach((poll) => {
        content += `<label><input type="radio" value="${poll.answer}"> ${poll.answer} </label>`;
      });
      content += "</div>";
    }
    content += "</div>";

    if (praise.length > 0) {
      praise[0].praised_user_ids.forEach((userId) => {
        const user = users.filter((obj) => obj.id === userId)[0];
        if (user) {
          content += `<div class="praised">Praised <b>${user.full_name}</b></div>`;
        }
      });
      content += praise[0].comment;
    }

    if (sharedMessage.length > 0) {
      const commentGroup = groups.filter(
        (obj) => obj.id === sharedMessage[0].group_id
      )[0];
      const commentUser = users.filter(
        (obj) => obj.id === sharedMessage[0].sender_id
      )[0];

      content += `
        <div class="shared-message">
          <div class="shared-message-head">
            Commented in <b>${commentGroup ? commentGroup.full_name : ""}</b>
          </div>
          <div class="shared-comment">
            <b>${commentUser.full_name}</b><br>
            ${sharedMessage[0].body.rich}
          </div>
        </div>
        `;
    }

    // Display only the first image
    const firstAttachment = feed.attachments[0];
    if (firstAttachment && firstAttachment.type === "image") {
      content += `<img class="featured-image" src="${firstAttachment.sharepoint_web_url}" alt="Attachment">`;
    }

    const commentCount = countComments(feed.id, feeds);

    content += `</div>
                <div class="post-footer" ${
                  feed.liked_by.count > 0 || commentCount > 0
                    ? 'style="margin-top: 10px"'
                    : ""
                }>`;

    if (commentCount > 0) {
      content += `<div class="comment-count">${commentCount} comment${
        commentCount > 1 ? "s" : ""
      }</div>`;
    }
    if (feed.liked_by.count > 0) {
      content += `<div class="reaction-count">${feed.liked_by.count} like${
        feed.liked_by.count > 1 ? "s" : ""
      }</div>`;
    }

    content += "</div>";

    post.innerHTML = content;
    postsContainer.appendChild(post);
  });

  // Add pagination
  const totalPages = Math.ceil(filteredFeeds.length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = "•";
    pageButton.classList.add("page-button");

    if (i === currentPage) {
      pageButton.classList.add("active");
    }

    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderFeed();
    });

    paginationContainer.appendChild(pageButton);
  }
}

// Initial render
renderFeed();

// Re-render on window resize
window.addEventListener("resize", renderFeed);
