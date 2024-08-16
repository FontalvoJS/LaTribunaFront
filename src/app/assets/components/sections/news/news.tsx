import React, { useEffect, useState, useCallback } from "react";
import styles from "./news.module.css";
import { getPreviewPosts } from "@/app/assets/services/posts";
import { useRouter } from "next/navigation";
import { PreviewPost } from "@/app/assets/types/types";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "@/app/assets/utils/format_date";
import { TypeAnimation } from "react-type-animation";
import { useThrottle } from "../../hooks/useThrottle";
import alertify from "@/app/assets/notifications/toast/alert_service";
const NewsComponent: React.FC = () => {
  const [posts, setPosts] = useState<PreviewPost[]>([]);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayNew, setDisplayNew] = useState<string>("");
  const router = useRouter();

  const handleNextTitle = useThrottle(() => {
    setCurrentTitleIndex((prevIndex) =>
      prevIndex === posts?.length - 1 ? 0 : prevIndex + 1
    );
  }, 1000);

  const handlePrevTitle = useThrottle(() => {
    setCurrentTitleIndex((prevIndex) =>
      prevIndex === 0 ? posts?.length - 1 : prevIndex - 1
    );
  }, 1000);

  const handleTitleClick = () => {
    if (posts[currentTitleIndex]) {
      router.push(`/blog/${posts[currentTitleIndex].slug}`);
    }
  };

  const getPost = (post: PreviewPost) => {
    router.push(`/blog/${post.slug}`);
  };

  const typeComponent = (
    <TypeAnimation
      sequence={[displayNew, 4000]}
      speed={50}
      cursor={false}
      style={{
        marginLeft: "5px",
        textDecoration: "underline",
        cursor: "pointer",
      }}
      key={displayNew}
    />
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const latestPosts = await getPreviewPosts();
        if (latestPosts) {
          setPosts(latestPosts);
          setDisplayNew(latestPosts[0].title);
        } else {
          alertify.error(
            "Hubo un problema con la carga de los artículos, intente nuevamente y reporte si el problema persiste"
          );
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    if (posts && posts[currentTitleIndex]) {
      setDisplayNew(posts[currentTitleIndex].title);
    }
  }, [currentTitleIndex, posts]);
  useEffect(() => {
    setTimeout(handleNextTitle, 5000);
  }, [displayNew, handleNextTitle]);
  if (posts?.length === 0) {
    return null;
  }

  const firstColumnPosts = posts?.slice(0, 5) ? posts.slice(0, 5) : false;
  const secondColumnPosts = posts?.slice(5, 10) ? posts.slice(5, 10) : false;

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="row">
          <div className="col-12">
            <div className={`alert ${styles.alert_dark}`}>
              <span onClick={handleTitleClick} className={styles.typingEffect}>
                <b>Lo último |</b>
                {typeComponent}
              </span>
              <div className={styles.controls_alert}>
                <span onClick={handlePrevTitle}>
                  <FontAwesomeIcon icon={faArrowAltCircleLeft} width={20} />
                </span>
                <span onClick={handleNextTitle}>
                  <FontAwesomeIcon icon={faArrowAltCircleRight} width={20} />
                </span>
              </div>
            </div>
          </div>
        </div>
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
            {firstColumnPosts &&
              firstColumnPosts.slice(1).map((post, index) => (
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
                    quality={50}
                    alt={post.title}
                  />
                  <div className={styles.articleContent}>
                    <h6 className={styles.articleCategory}>{post.category}</h6>
                    <h5 className={styles.articleTitle}>{post.title}</h5>
                    <p className={styles.articleDate}>
                      {formatDate(post.date, true)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            {secondColumnPosts && secondColumnPosts.length > 0 && (
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
            {secondColumnPosts &&
              secondColumnPosts.slice(1).map((post, index) => (
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
                    quality={50}
                    alt={post.title}
                  />
                  <div className={styles.articleContent}>
                    <h6 className={styles.articleCategory}>{post.category}</h6>
                    <h5 className={styles.articleTitle}>{post.title}</h5>
                    <p className={styles.articleDate}>
                      {formatDate(post.date, true)}
                    </p>
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
