import React, { useState, useEffect } from "react";
import { config } from "../config";
import { getUserToken } from "../utils/auth";

// Interface definitions based on the original code structure
interface VivaUser {
  id: string;
  full_name: string;
  mugshot_url: string;
  type: "user";
}

interface VivaGroup {
  id: string;
  full_name: string;
  type: "group";
}

interface VivaReference {
  id: string;
  type: "user" | "group";
  full_name?: string;
  mugshot_url?: string;
}

interface VivaPollOption {
  answer: string;
}

interface VivaAttachment {
  type: "praise" | "shared_message" | "image";
  praised_user_ids?: string[];
  comment?: string;
  sharepoint_web_url?: string;
  group_id?: string;
  sender_id?: string;
  body?: {
    rich: string;
  };
}

interface VivaLikedBy {
  count: number;
}

interface VivaMessage {
  id: string;
  message_type: "update" | "question" | "poll" | "praise";
  sender_id: string;
  group_id: string | null;
  web_url: string;
  shared_message_id?: string | null;
  replied_to_id?: string | null;
  published_at: string;
  title?: string;
  body: {
    rich: string;
  };
  poll_options?: VivaPollOption[];
  attachments: VivaAttachment[];
  liked_by: VivaLikedBy;
}

interface VivaFeedData {
  messages: VivaMessage[];
  references: VivaReference[];
}

const VivaFeed: React.FC = () => {
  const [vivaFeed, setVivaFeed] = useState<VivaFeedData>({
    messages: [],
    references: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPageDesktop = 3;
  const postsPerPageMobile = 1;

  const fetchVivaFeedFromServer = async (): Promise<VivaFeedData> => {
    const userToken = await getUserToken();
    const functionUrl = `${config.serverUrl}/api/${config.httpTriggerName}?code=${config.defaultKey}`;

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
  };

  const countComments = (postId: string, feeds: VivaMessage[]): number => {
    return feeds.filter((feed) => feed.replied_to_id === postId).length;
  };

  const fetchFeed = async () => {
    try {
      setIsLoading(true);
      const feedData = await fetchVivaFeedFromServer();
      setVivaFeed(feedData);
    } catch (error) {
      console.error("Feed fetch error:", error);
      // Return empty structure on error
      setVivaFeed({ messages: [], references: [] });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Reset to page 1 on resize to prevent issues
      setCurrentPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="social-posts-wrapper">
        <div className="social-posts">Loading...</div>
        <div className="sp-paginate"></div>
      </div>
    );
  }

  if (!vivaFeed.messages || vivaFeed.messages.length === 0) {
    return (
      <div className="social-posts-wrapper">
        <div className="social-posts">No posts available</div>
        <div className="sp-paginate"></div>
      </div>
    );
  }

  // Filter out Comments and alike
  const filteredFeeds = vivaFeed.messages.filter((feed) => {
    return (
      feed.message_type !== "update" ||
      (feed.message_type === "update" && feed.replied_to_id === null)
    );
  });

  const users = vivaFeed.references.filter(
    (obj) => obj.type === "user"
  ) as VivaUser[];
  const groups = vivaFeed.references.filter(
    (obj) => obj.type === "group"
  ) as VivaGroup[];

  // Determine posts per page based on screen size
  const postsPerPage =
    window.innerWidth <= 768 ? postsPerPageMobile : postsPerPageDesktop;

  // Calculate start and end index based on the current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, filteredFeeds.length);

  // Get posts for current page
  const currentPosts = filteredFeeds.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(filteredFeeds.length / postsPerPage);

  const renderPost = (feed: VivaMessage) => {
    const author = users.find((obj) => obj.id === feed.sender_id);
    const group = groups.find((obj) => obj.id === feed.group_id);

    const praise = feed.attachments.filter((obj) => obj.type === "praise");
    const sharedMessage = feed.attachments.filter(
      (obj) => obj.type === "shared_message"
    );

    let postHighlight = "";
    if (feed.message_type !== "update") {
      postHighlight = feed.message_type;
    }
    if (praise.length > 0) {
      postHighlight = "praise";
    }

    const commentCount = countComments(feed.id, vivaFeed.messages);

    return (
      <a
        key={feed.id}
        className="post-link"
        href={feed.web_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="post-top">
          {feed.shared_message_id != null || feed.group_id == null ? (
            <span>
              Shared on <b>Storyline</b>
            </span>
          ) : (
            <span>
              Posted in <b>{group ? group.full_name : ""}</b>
            </span>
          )}
        </div>
        <div className="post-header">
          <img src={author?.mugshot_url} alt="User" className="post-avatar" />
          <div className="author-meta">
            <h4>{author?.full_name}</h4>
            <span className="time">
              {new Date(feed.published_at).toDateString()}
            </span>
          </div>
        </div>
        <div
          className="post-content"
          {...(postHighlight && { "post-highlight": postHighlight })}
        >
          {feed.message_type === "question" && <h4>{feed.title}</h4>}
          <div
            className={`description ${
              feed.message_type === "question" ? "question-details" : ""
            }`}
          >
            <div dangerouslySetInnerHTML={{ __html: feed.body.rich }} />

            {feed.message_type === "poll" && (
              <div className="poll-options">
                {feed.poll_options?.map((poll, index) => (
                  <label key={index}>
                    <input type="radio" value={poll.answer} /> {poll.answer}
                  </label>
                ))}
              </div>
            )}
          </div>

          {praise.length > 0 && (
            <>
              {praise[0].praised_user_ids?.map((userId) => {
                const user = users.find((obj) => obj.id === userId);
                if (user) {
                  return (
                    <div key={userId} className="praised">
                      Praised <b>{user.full_name}</b>
                    </div>
                  );
                }
                return null;
              })}
              {praise[0].comment && (
                <div dangerouslySetInnerHTML={{ __html: praise[0].comment }} />
              )}
            </>
          )}

          {sharedMessage.length > 0 && (
            <div className="shared-message">
              <div className="shared-message-head">
                Commented in{" "}
                <b>
                  {groups.find((obj) => obj.id === sharedMessage[0].group_id)
                    ?.full_name || ""}
                </b>
              </div>
              <div className="shared-comment">
                <b>
                  {
                    users.find((obj) => obj.id === sharedMessage[0].sender_id)
                      ?.full_name
                  }
                </b>
                <br />
                <div
                  dangerouslySetInnerHTML={{
                    __html: sharedMessage[0].body?.rich || "",
                  }}
                />
              </div>
            </div>
          )}

          {/* Display only the first image */}
          {feed.attachments[0]?.type === "image" && (
            <img
              className="featured-image"
              src={feed.attachments[0].sharepoint_web_url}
              alt="Attachment"
            />
          )}
        </div>

        <div
          className="post-footer"
          style={{
            ...(feed.liked_by.count > 0 || commentCount > 0
              ? { marginTop: "10px" }
              : {}),
          }}
        >
          {commentCount > 0 && (
            <div className="comment-count">
              {commentCount} comment{commentCount > 1 ? "s" : ""}
            </div>
          )}
          {feed.liked_by.count > 0 && (
            <div className="reaction-count">
              {feed.liked_by.count} like{feed.liked_by.count > 1 ? "s" : ""}
            </div>
          )}
        </div>
      </a>
    );
  };

  const renderPagination = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`page-button ${i === currentPage ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          •
        </button>
      );
    }
    return pageButtons;
  };

  return (
    <div className="social-posts-wrapper">
      <div className="social-posts">{currentPosts.map(renderPost)}</div>
      <div className="sp-paginate">{totalPages > 1 && renderPagination()}</div>
    </div>
  );
};

export default VivaFeed;
