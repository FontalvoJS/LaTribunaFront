import React, { useEffect, useState } from "react";
import styles from "./news.module.css";
import { getPreviewPosts } from "@/app/assets/services/posts";
import { useRouter } from "next/navigation";
import { PreviewPost } from "@/app/assets/types/types";
import { formatDate } from "@/app/assets/utils/format_date";
import Image from "next/image";

const NewsComponent = () => {
  const [posts, setPosts] = useState<PreviewPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const latestPosts = await getPreviewPosts();
      setPosts(latestPosts);
    };
    fetchPosts();
  }, []);

  const getPost = (post: PreviewPost) => {
    router.push(`/blog/${post.slug}`);
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        {/* Columna para el NewsComponent */}
        <div className="col-md-6">
          <div className="row">
            <div className="col-12 mb-4">
              {posts.length > 0 && (
                <div
                  className={`card ${styles.mainCard}`}
                  style={{ backgroundImage: `url(${posts[0].image})` }}
                  onClick={() => getPost(posts[0])}
                >
                  <div className={styles.mainCardContent}>
                    <h2 className={styles.mainCardTitle}>
                      {posts[0].title}
                    </h2>
                  </div>
                </div>
              )}
            </div>
            {posts.slice(1).map((post, index) => (
              <div key={index} className={`col-12 mb-2 ${styles.secondaryArticle}`} onClick={() => getPost(post)}>
                <Image src={post.image} className={styles.articleImage}  width={300} height={200} alt={post.title} />
                <div className={styles.articleContent}>
                  <h6 className={styles.articleCategory}>{post.category}</h6>
                  <h5 className={styles.articleTitle}>{post.title}</h5>
                  <p className={styles.articleDate}>{formatDate(post.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna para la imagen */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          {/* Aquí puedes agregar una imagen o contenido según sea necesario */}
        </div>
      </div>
    </div>
  );
};

export default NewsComponent;
