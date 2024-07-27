import React, { useEffect, useState } from "react";
import styles from "./news.module.css";
import { getPreviewPosts } from "@/app/assets/services/posts";
import { useRouter } from "next/navigation";
import { PreviewPost } from "@/app/assets/types/types";
import { formatDate } from "@/app/assets/utils/format_date";
import Image from "next/image";

const NewsComponent: React.FC = () => {
  const [posts, setPosts] = useState<PreviewPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const latestPosts = await getPreviewPosts();
        setPosts(latestPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const getPost = (post: PreviewPost) => {
    router.push(`/blog/${post.slug}`);
  };

  // Dividir las publicaciones en dos grupos para cada columna
  if (posts?.length === 0) {
    return null;
  }

  const firstColumnPosts = posts?.slice(0, 5) ? posts.slice(0, 5) : false;
  const secondColumnPosts = posts?.slice(5, 10) ? posts.slice(5, 10) : false;

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        {/* Primera columna */}
        <div className="col-md-6">
          <div className="row">
            {firstColumnPosts && firstColumnPosts.length > 0 && (
              <div className="col-12 mb-4">
                <div
                  className={`card ${styles.mainCard}`}
                  style={{
                    backgroundImage: `url(${firstColumnPosts[0].image})`,
                  }}
                  onClick={() => getPost(firstColumnPosts[0])}
                >
                  <div className={styles.mainCardContent}>
                    <h2 className={styles.mainCardTitle}>
                      {firstColumnPosts[0].title}
                    </h2>
                  </div>
                </div>
              </div>
            )}
            {firstColumnPosts && firstColumnPosts.slice(1).map((post, index) => (
              <div
                key={index}
                className={`col-12 mb-2 ${styles.secondaryArticle}`}
                onClick={() => getPost(post)}
              >
                <Image
                  src={post.image}
                  className={styles.articleImage}
                  width={300}
                  height={200}
                  alt={post.title}
                />
                <div className={styles.articleContent}>
                  <h6 className={styles.articleCategory}>{post.category}</h6>
                  <h5 className={styles.articleTitle}>{post.title}</h5>
                  <p className={styles.articleDate}>{formatDate(post.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Segunda columna */}
        <div className="col-md-6">
          <div className="row">
            { secondColumnPosts && secondColumnPosts.length > 0 && (
              <div className="col-12 mb-4">
                <div
                  className={`card ${styles.mainCard}`}
                  style={{
                    backgroundImage: `url(${secondColumnPosts[0].image})`,
                  }}
                  onClick={() => getPost(secondColumnPosts[0])}
                >
                  <div className={styles.mainCardContent}>
                    <h2 className={styles.mainCardTitle}>
                      {secondColumnPosts[0].title}
                    </h2>
                  </div>
                </div>
              </div>
            )}
            {secondColumnPosts && secondColumnPosts.slice(1).map((post, index) => (
              <div
                key={index}
                className={`col-12 mb-2 ${styles.secondaryArticle}`}
                onClick={() => getPost(post)}
              >
                <Image
                  src={post.image}
                  className={styles.articleImage}
                  width={300}
                  height={200}
                  alt={post.title}
                />
                <div className={styles.articleContent}>
                  <h6 className={styles.articleCategory}>{post.category}</h6>
                  <h5 className={styles.articleTitle}>{post.title}</h5>
                  <p className={styles.articleDate}>{formatDate(post.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsComponent;
