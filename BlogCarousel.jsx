import React, { useEffect, useRef, useState } from "react";
import styles from "./BlogCarousel.module.css";

const BlogCarousel = () => {
  const [posts, setPosts] = useState([]);
  const trackRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const proxyUrl = "https://api.codetabs.com/v1/proxy/?quest=";
        const targetUrl = encodeURIComponent(
          "https://picky-yapper.blogspot.com/feeds/posts/default?alt=json"
        );

        const res = await fetch(`${proxyUrl}${targetUrl}`);
        const feed = await res.json();

        const entries = (feed && feed.feed && feed.feed.entry) || [];
        const parsed = entries.map((item) => {
          // Grab best available HTML (summary or content), then clean it
          const rawHtml =
            (item.summary && item.summary.$t) ||
            (item.content && item.content.$t) ||
            "";
          const cleaned = rawHtml.replace(/<[^>]+>/g, "").trim();
          const snippet =
            cleaned.length > 0
              ? `${cleaned.split(/\s+/).slice(0, 30).join(" ")}…`
              : "No preview available.";

          const linkObj = Array.isArray(item.link)
            ? item.link.find((l) => l.rel === "alternate")
            : null;
          return {
            title: item.title?.$t || "Untitled",
            link: (linkObj && linkObj.href) || "#",
            snippet,
          };
        });

        setPosts(parsed);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className={styles.blogCarousel}>
      {posts.length > 0 ? (
        <div className="carousel-container">
        

          <div className={styles.carouselTrack} ref={trackRef}>
            {posts.map((post, i) => (
              <a
                key={i}
                className={styles.blogCard}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{post.title}</h3>
                <p>{post.snippet}</p>
              </a>
            ))}
          </div>

          
        </div>
      ) : (
        <p className={styles.loadingText}>Loading blogs...</p>
      )}
    </div>
  );
};

export default BlogCarousel;
