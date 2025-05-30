import { MSGraphClientV3 } from "@microsoft/sp-http";
import React from "react";

export interface VivaPost {
  id: string;
  title: string;
  body: string;
  author: {
    name: string;
    profileImageUrl?: string;
  };
  createdAt: string;
  commentCount: number;
}

export interface VivaFeedProps {
  graphClient: MSGraphClientV3;
}

export const VivaFeed: React.FC<VivaFeedProps> = ({ graphClient }) => {
  const [posts, setPosts] = React.useState<VivaPost[]>([]);

  React.useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        const response = await graphClient.api("/chats").get(); // adjust this API to your actual need

        const data = response.value;
        console.log("data: ", data);

        const formattedPosts: VivaPost[] = data.map((item: any) => ({
          id: item.id,
          title: item.jobTitle || "Untitled", // Customize as needed
          body: "",
          author: {
            name: item.displayName,
            profileImageUrl: "", // Optional
          },
          createdAt: item.createdDateTime || new Date().toISOString(),
          commentCount: 0,
        }));

        setPosts(formattedPosts);
      } catch (err) {
        console.error("Graph error Y:", err);
      }
    };

    fetchPosts();
  }, [graphClient]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};
