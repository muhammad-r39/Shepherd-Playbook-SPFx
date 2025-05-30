const CACHE_EXPIRY_HOURS = 48; // 48-hour expiry

// Utility function to check if cached data is stale
function isCacheStale(timestamp) {
  const currentTime = new Date().getTime();
  return currentTime - timestamp > CACHE_EXPIRY_HOURS * 60 * 60 * 1000;
}

// Background update function
async function backgroundUpdateCache() {
  try {
    const freshData = await fetchVivaFeedFromServer();
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: freshData,
        timestamp: new Date().getTime(),
      })
    );
    console.log("Background cache update complete");
  } catch (error) {
    console.error("Background cache update failed:", error);
  }
}

// Utility function to generate avatar initials
function getInitials(name) {
  // Handle cases with multiple names
  const names = name.split(" ");

  // Get first and last name initials
  if (names.length > 1) {
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }

  // If only one name, return first two characters
  return name.substring(0, 2).toUpperCase();
}

// Function to create a fallback avatar with initials
function createInitialsAvatar(name, size = 32) {
  // Generate a deterministic background color based on the name
  const hash = name
    .split("")
    .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const hue = hash % 360;
  const backgroundColor = `hsl(${hue}, 70%, 50%)`;

  const initials = getInitials(name);

  const avatarElement = document.createElement("div");
  avatarElement.classList.add("avatar-initials");
  avatarElement.innerHTML = initials;
  avatarElement.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background-color: ${backgroundColor};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 12px;
    line-height: ${size}px;
  `;

  return avatarElement;
}

// Function to verify image URL
async function verifyImageUrl(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error("Image verification error:", error);
    return false;
  }
}

async function fetchImageWithCORSFallback(url) {
  try {
    // First, try direct fetch
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Origin: window.location.origin,
      },
    });

    if (response.ok) {
      return url;
    }
  } catch (error) {
    console.warn("Direct image fetch failed:", error);
  }

  // Fallback to data URL or initials if direct fetch fails
  return null;
}

function countComments(post_id, feeds) {
  let comment = 0;
  feeds.forEach((feed) => {
    if (feed.replied_to_id === post_id) {
      comment++;
    }
  });
  return comment;
}
