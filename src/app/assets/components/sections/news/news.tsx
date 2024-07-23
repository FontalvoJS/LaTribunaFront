"use client";
import styles from "./news.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { getPreviewPosts } from "@/app/assets/services/posts";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PreviewPost } from "@/app/assets/types/types";
export default function News() {
  const [posts, setPosts] = useState<PreviewPost[]>([]);
  const router = useRouter();
  const getPost = async (post: PreviewPost) => {
    router.push(`/blog/${post.slug}`);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const latestPosts = await getPreviewPosts();
      setPosts(latestPosts);
    };
    fetchPosts();
  }, []);
  useEffect(() => {
    console.log(posts);
  }, [posts]);
  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-12">
          <div className={`alert ${styles.alert_dark}`}>
            <span>
              <b>Lo último |</b> Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Laudantium, eaque? In
            </span>
            <div className={styles.controls_alert}>
              <span>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} width={20} />
              </span>
              <span>
                <FontAwesomeIcon icon={faArrowAltCircleRight} width={20} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
          <div
            id={styles.principal_news}
            onClick={() => {
              getPost(posts[0]);
            }}
            style={
              posts && posts[0]?.image
                ? { backgroundImage: `url(${posts[0]?.image})` }
                : {}
            }
          >
            <h4 id={styles.principal_new_title}>
              {(posts && posts[0]?.title) || "Cargando..."}
            </h4>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
          <div
            className={styles.content_card}
            onClick={() => {
              getPost(posts[1]);
            }}
            style={
              posts && posts[1]?.image
                ? { backgroundImage: `url(${posts[1]?.image})` }
                : {}
            }
          >
            <h4 className={styles.content_card_title}>
              {(posts && posts[1]?.title) || "Cargando..."}
            </h4>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
          <div
            className={styles.content_card}
            onClick={() => {
              getPost(posts[2]);
            }}
            style={
              posts && posts[2]?.image
                ? { backgroundImage: `url(${posts[2]?.image})` }
                : {}
            }
          >
            <h4 className={styles.content_card_title}>
              {(posts && posts[2]?.title) || "Cargando..."}
            </h4>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
          <div
            className={styles.content_card}
            onClick={() => {
              getPost(posts[3]);
            }}
            style={
              posts && posts[3]?.image
                ? { backgroundImage: `url(${posts[3]?.image})` }
                : {}
            }
          >
            <h4 className={styles.content_card_title}>
              {(posts && posts[3]?.title) || "Cargando..."}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
